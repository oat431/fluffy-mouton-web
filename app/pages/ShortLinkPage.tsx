/* eslint-disable react-refresh/only-export-components */
import MainLayout from "../layouts/Section.tsx";
import { useState, useEffect, useRef } from "react";
import { Form, useLoaderData, useNavigation, useFetcher, useRevalidator } from "react-router";
import type { ClientActionFunctionArgs } from "react-router";
import { createCustomShortLink, getShortLinks, createRandomShortLink, updateShortLink, deleteShortLink} from "../services/ShortLinkService.ts";
import type { ShortLinkList } from "../types/ShortLinkDto.ts";
import ClickToCopy from "../components/ClickToCopy.tsx";

export async function clientLoader() {
    try {
        const response = await getShortLinks();
        return { shortLinks: response.data as unknown as ShortLinkList[] };
    } catch (error) {
        console.error("Error fetching short links:", error);
        return { shortLinks: [] };
    }
}

export async function clientAction({ request }: ClientActionFunctionArgs) {
    const formData = await request.formData();
    const action = formData.get("_action") as string;

    try {
        if (action === "create") {
            const targetUrl = formData.get("targetUrl") as string;
            const isCustom = formData.get("isCustom") === "on";
            const customAlias = formData.get("customAlias") as string;

            const result = isCustom 
                ? await createCustomShortLink({ url: targetUrl, custom_name: customAlias })
                : await createRandomShortLink({ url: targetUrl });

            if (result.status !== "SUCCESS") {
                return { error: result.error?.Message || "Failed to create short link" };
            }
        } else if (action === "delete") {
            const linkId = formData.get("linkId") as string;
            const result = await deleteShortLink(linkId);
            
            if (result.status !== "SUCCESS") {
                return { error: result.error?.Message || "Failed to delete short link" };
            }
        } else if (action === "update") {
            const linkId = formData.get("linkId") as string;
            const newUrl = formData.get("newUrl") as string;
            const result = await updateShortLink(linkId, { url: newUrl });
            
            if (result.status !== "SUCCESS") {
                return { error: result.error?.Message || "Failed to update short link" };
            }
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An error occurred";
        console.error("Error in client action:", errorMessage);
        return { error: errorMessage };
    }
    
    return { success: true };
}

export default function ShortLinkPage() {
    const { shortLinks } = useLoaderData<typeof clientLoader>();
    const navigation = useNavigation();
    const revalidator = useRevalidator();
    const deleteFetcher = useFetcher();
    const updateFetcher = useFetcher();
    
    const isSubmitting = navigation.state === "submitting";
    const [isCustom, setIsCustom] = useState<boolean>(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editUrl, setEditUrl] = useState<string>("");

    // Refs to track previous states and avoid duplicate revalidations
    const prevDeleteStateRef = useRef<string | null>(null);
    const prevUpdateStateRef = useRef<string | null>(null);
    const prevNavStateRef = useRef<string | null>(null);

    // Revalidate only once when delete completes (state changes from "submitting" to "idle")
    useEffect(() => {
        if (prevDeleteStateRef.current === "submitting" && deleteFetcher.state === "idle") {
            void revalidator.revalidate();
        }
        prevDeleteStateRef.current = deleteFetcher.state;
    }, [deleteFetcher.state, revalidator]);

    // Revalidate only once when update completes (state changes from "submitting" to "idle")
    useEffect(() => {
        if (prevUpdateStateRef.current === "submitting" && updateFetcher.state === "idle") {
            void revalidator.revalidate();
        }
        prevUpdateStateRef.current = updateFetcher.state;
    }, [updateFetcher.state, revalidator]);

    // Revalidate only once when form submission completes (state changes from "submitting" to "idle")
    useEffect(() => {
        if (prevNavStateRef.current === "submitting" && navigation.state === "idle") {
            void revalidator.revalidate();
        }
        prevNavStateRef.current = navigation.state;
    }, [navigation.state, revalidator]);

    const cvrtTOShrt = (linkType: string, alias: string) => {
        return `http://localhost:8004/api/v1/${linkType === "CUSTOM" ? "c" : "r"}/${alias}`;
    }

    const handleEditClick = (link: ShortLinkList) => {
        setEditingId(link.id);
        setEditUrl(link.original_link);
    }

    const handleEditCancel = () => {
        setEditingId(null);
        setEditUrl("");
    }

    const handleEditSave = (linkId: string) => {
        const formData = new FormData();
        formData.append("_action", "update");
        formData.append("linkId", linkId);
        formData.append("newUrl", editUrl);
        void updateFetcher.submit(formData, { method: "post" });
        handleEditCancel();
    }

    const handleDelete = (linkId: string) => {
        if (confirm("Are you sure you want to delete this short link?")) {
            const formData = new FormData();
            formData.append("_action", "delete");
            formData.append("linkId", linkId);
            void deleteFetcher.submit(formData, { method: "post" });
        }
    }

    return (
        <MainLayout wide>
            <div className="w-full min-h-screen px-4 py-8">
                <div className="max-w-full mx-auto space-y-8">
                    {/* Header Section */}
                    <div className="text-center space-y-2 my-8">
                    <h1 className="text-4xl md:text-5xl font-black text-base-content tracking-tight">URL Shortener</h1>
                    <p className="text-base-content/60 text-lg">Create short, memorable links in seconds.</p>
                </div>

                {/* Create Link Card */}
                <div className="card bg-base-100 shadow-xl border border-base-200 w-full">
                    <div className="card-body">
                        <h2 className="card-title text-xl mb-4 text-base-content/90">Shorten a new URL</h2>
                        <Form method="post" className="space-y-6">
                            <div className="w-full">
                                <label className="label">
                                    <span className="label-text font-semibold">Destination URL</span>
                                </label>
                                <input 
                                    type="url" 
                                    name="targetUrl" 
                                    className="input input-bordered w-full focus:input-primary transition-colors" 
                                    placeholder="https://your-very-long-url.com/something-really-long" 
                                    required 
                                    disabled={isSubmitting} 
                                />
                            </div>

                            <div className="bg-base-200/50 p-4 rounded-box border border-base-200 transition-colors">
                                <label className="label cursor-pointer justify-start gap-4">
                                    <input 
                                        type="checkbox" 
                                        name="isCustom" 
                                        className="toggle toggle-primary" 
                                        checked={isCustom} 
                                        onChange={(e) => setIsCustom(e.target.checked)} 
                                        disabled={isSubmitting} 
                                    />
                                    <span className="label-text font-medium text-base-content">Customize short link</span>
                                </label>
                                
                                <div className={`grid transition-all duration-300 ease-in-out ${isCustom ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"}`}>
                                    <div className="overflow-hidden">
                                        <div className="flex items-stretch gap-0">
                                            <span className="text-base-content/60 font-mono bg-base-300 px-4 py-3 rounded-l-box border border-r-0 border-base-300 flex items-center">
                                                flumou.com/
                                            </span>
                                            <input 
                                                type="text" 
                                                name="customAlias" 
                                                className="input input-bordered w-full rounded-l-none focus:input-primary transition-colors font-mono" 
                                                placeholder="my-custom-alias" 
                                                required={isCustom}
                                                disabled={isSubmitting || !isCustom} 
                                            />
                                        </div>
                                        <label className="label">
                                            <span className="label-text-alt text-base-content/50">Letters, numbers, and dashes only.</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <input type="hidden" name="_action" value="create" />

                            <div className="card-actions justify-end mt-6">
                                <button type="submit" className="btn btn-primary w-full sm:w-auto min-w-32 shadow-sm transition-transform active:scale-95" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <span className="loading loading-spinner loading-sm"></span>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            Shorten URL
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                        </>
                                    )}
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>

                {/* Links Table Card */}
                <div className="card bg-base-100 shadow-xl border border-base-200 w-full">
                    <div className="card-body p-0">
                        <div className="p-6 border-b border-base-200 flex justify-between items-center">
                            <h2 className="card-title text-xl text-base-content/90">Recent Links</h2>
                            <div className="badge badge-primary badge-outline font-mono">{shortLinks.length}</div>
                        </div>
                        
                        {shortLinks.length > 0 ? (
                            <div className="w-full">
                                <div className="overflow-x-auto w-full">
                                    <table className="table w-full">
                                        <thead className="bg-base-200/50 text-base-content/70 text-sm uppercase tracking-wider">
                                            <tr>
                                                <th className="w-12 text-center font-semibold">#</th>
                                                <th className="font-semibold">Short Link</th>
                                                <th className="font-semibold">Destination URL</th>
                                                <th className="w-32 text-center font-semibold">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {shortLinks.map((link, index) => {
                                            const shortUrl = cvrtTOShrt(link.link_type, link.short_link);
                                            const isEditing = editingId === link.id;
                                            
                                            return (
                                                <tr key={link.id} className="hover:bg-base-200/30 transition-colors border-b border-base-200/50">
                                                    <td className="text-center text-base-content/50 font-mono text-sm font-semibold">{index + 1}</td>
                                                    <td>
                                                        <div className="flex items-center gap-2">
                                                            <a 
                                                                href={shortUrl} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer" 
                                                                className="link link-hover link-primary font-mono font-medium text-sm break-all"
                                                            >
                                                                {shortUrl}
                                                            </a>
                                                            <div className="flex-shrink-0">
                                                                <ClickToCopy text={shortUrl} />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {isEditing ? (
                                                            <div className="flex gap-2 items-center">
                                                                <input 
                                                                    type="url"
                                                                    value={editUrl}
                                                                    onChange={(e) => setEditUrl(e.target.value)}
                                                                    className="input input-bordered input-sm w-full"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className="text-base-content/70 text-sm break-all">
                                                                {link.original_link}
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="flex gap-1 justify-center">
                                                            {isEditing ? (
                                                                <>
                                                                    <button 
                                                                        onClick={() => handleEditSave(link.id)}
                                                                        className="btn btn-xs btn-success"
                                                                        disabled={updateFetcher.state === "submitting"}
                                                                        title="Save changes"
                                                                    >
                                                                        Save
                                                                    </button>
                                                                    <button 
                                                                        onClick={handleEditCancel}
                                                                        className="btn btn-xs btn-ghost"
                                                                        title="Cancel editing"
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <button 
                                                                        onClick={() => handleEditClick(link)}
                                                                        className="btn btn-xs btn-info btn-outline"
                                                                        title="Edit URL"
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                    <button 
                                                                        onClick={() => handleDelete(link.id)}
                                                                        className="btn btn-xs btn-error btn-outline"
                                                                        title="Delete link"
                                                                        disabled={deleteFetcher.state === "submitting"}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div className="py-20 text-center flex flex-col items-center justify-center">
                                <div className="bg-base-200 p-6 rounded-full mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-base-content/80">No links yet</h3>
                                <p className="text-base-content/50 mt-2 max-w-sm mx-auto">Create your first short link using the form above to start managing your URLs.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            </div>
        </MainLayout>
    );
}
