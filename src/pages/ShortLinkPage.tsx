/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-floating-promises */
import MainLayout from "../layouts/Section.tsx";
import { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext.tsx";
import { createCustomShortLink, getShortLinks, createRandomShortLink} from "../services/ShortLinkService.ts";
import type { ShortLinkList } from "../types/ShortLinkDto.ts";
import ClickToCopy from "../components/ClickToCopy.tsx";
export default function ShortLinkPage() {
    const [targetUrl, setTargetUrl] = useState<string>("");
    const [isCustom, setIsCustom] = useState<boolean>(false);
    const [customAlias, setCustomAlias] = useState<string>("");
    const [shortLinks, setShortLinks] = useState<ShortLinkList[]>([]);

    const fetchAllLink = async () => {
        try {
            const data = (await getShortLinks()).data as unknown as ShortLinkList[];
            console.log("Short Links:", data);
            setShortLinks(data);
        } catch (_error) {
            console.error("Error fetching short links:", _error);
        }
    };

    useEffect(() => {
        void fetchAllLink();
    }, []);

    const createLink = async () => {
        try {
            if (isCustom) {
                await createCustomShortLink({
                    url: targetUrl,
                    custom_name: customAlias,
                });
            } else {
                await createRandomShortLink({
                    url: targetUrl,
                });
            }
            await fetchAllLink();
            setTargetUrl("");
            setCustomAlias("");
            setIsCustom(false);
        } catch (error) {
            console.error("Error creating custom short link:", error);
        }
    }

    const cvrtTOShrt = (linkType: string, alias: string) => {
        return `http://localhost:8004/api/v1/${linkType === "CUSTOM" ? "c" : "r"}/${alias}`;
    }

    return (
        <MainLayout>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Your Very Long URL goes here</legend>
                <input type="text" className="input w-full" placeholder="Type here" value={targetUrl} onChange={(e) => setTargetUrl(e.target.value)}/>
                <label className="label">
                    <input type="checkbox" className="toggle" checked={isCustom} onChange={(e) => setIsCustom(e.target.checked)}/>
                    <span className="label-text ml-2">Enable Custom Short URL</span>
                </label>
                {isCustom && (
                    <div className="mt-4">
                        <input type="text" className="input w-full" placeholder="Enter Custom Short URL" value={customAlias} onChange={(e) => setCustomAlias(e.target.value)}/>
                    </div>
                )}
                <button className="btn btn-primary mt-4" onClick={() => void createLink()}>Process</button>
            </fieldset>
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
