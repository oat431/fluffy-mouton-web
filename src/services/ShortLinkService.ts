import api from "../utils/APIClient";
import type {
    ShortLinkRequest,
} from "../types/ShortLinkRequest";
import type {
    ShortLinkList,
} from "../types/ShortLinkDto";
import type { ApiResponse } from "../types/ApiResponse";

export async function createShortLink(shortLinkRequest: ShortLinkRequest): Promise<ApiResponse<ShortLinkList>> {
    const response = await api.post<ApiResponse<ShortLinkList>>("/shortlink/create", shortLinkRequest);
    return response.data;
}

export async function getShortLinks(): Promise<ApiResponse<ShortLinkList[]>> {
    const response = await api.get<ApiResponse<ShortLinkList[]>>("/shortlink/list");
    return response.data;
}

export async function deleteShortLink(id: string): Promise<ApiResponse<string>> {
    const response = await api.delete<ApiResponse<string>>(`/shortlink/delete/${id}`);
    return response.data;
}