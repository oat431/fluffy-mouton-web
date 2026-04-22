import MainLayout from "../layouts/Section.tsx";
import { useState } from "react";
import { Form, useLoaderData, useNavigation } from "react-router";
import type { ClientActionFunctionArgs } from "react-router";
import { createCustomShortLink, getShortLinks, createRandomShortLink} from "../services/ShortLinkService.ts";
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
    const targetUrl = formData.get("targetUrl") as string;
    const isCustom = formData.get("isCustom") === "on";
    const customAlias = formData.get("customAlias") as string;

    try {
        if (isCustom) {
            await createCustomShortLink({ url: targetUrl, custom_name: customAlias });
        } else {
            await createRandomShortLink({ url: targetUrl });
        }
    } catch (error) {
        console.error("Error creating short link:", error);
    }
    return null;
}

export default function ShortLinkPage() {
    const { shortLinks } = useLoaderData<typeof clientLoader>();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    
    const [isCustom, setIsCustom] = useState<boolean>(false);



    const cvrtTOShrt = (linkType: string, alias: string) => {
        return `http://localhost:8004/api/v1/${linkType === "CUSTOM" ? "c" : "r"}/${alias}`;
    }

    return (
        <MainLayout>
            <Form method="post" className="fieldset">
                <legend className="fieldset-legend">Your Very Long URL goes here</legend>
                <input type="url" name="targetUrl" className="input w-full" placeholder="Type here" required disabled={isSubmitting} />
                <label className="label">
                    <input type="checkbox" name="isCustom" className="toggle" checked={isCustom} onChange={(e) => setIsCustom(e.target.checked)} disabled={isSubmitting} />
                    <span className="label-text ml-2">Enable Custom Short URL</span>
                </label>
                {isCustom && (
                    <div className="mt-4">
                        <input type="text" name="customAlias" className="input w-full" placeholder="Enter Custom Short URL" required disabled={isSubmitting} />
                    </div>
                )}
                <button type="submit" className="btn btn-primary mt-4" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Process"}
                </button>
            </Form>
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Short Link</th>
                        <th>Original Link</th>
                    </tr>
                </thead>
                <tbody>
                {
                    shortLinks.length > 0 && shortLinks.map((link, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{cvrtTOShrt(link.link_type, link.short_link)} <ClickToCopy text={cvrtTOShrt(link.link_type, link.short_link)} /></td>
                            <td>{link.original_link}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </MainLayout>
    );
}
