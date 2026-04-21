import api from "../utils/APIClient";

export async function redirectShortLink(shortLink: string, linkType: string): Promise<void> {
    await api.get('/' + linkType + '/' + shortLink);
}