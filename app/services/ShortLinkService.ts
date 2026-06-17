import api from "../utils/APIClient";
import type {
    ShortLinkRequest,
} from "../types/ShortLinkRequest";
import type {
    ShortLinkList,
} from "../types/ShortLinkDto";
import type { ApiResponse } from "../types/ApiResponse";

export async function createRandomShortLink(shortLinkRequest: ShortLinkRequest): Promise<ApiResponse<ShortLinkList>> {
    const response = await api.post<ApiResponse<ShortLinkList>>("/short/random", shortLinkRequest);
    return response.data;
}

export async function createCustomShortLink(shortLinkRequest: ShortLinkRequest): Promise<ApiResponse<ShortLinkList>> {
    const response = await api.post<ApiResponse<ShortLinkList>>("/short/custom", shortLinkRequest);
    return response.data;
}

export async function getShortLinks(): Promise<ApiResponse<ShortLinkList[]>> {
    const response = await api.get<ApiResponse<ShortLinkList[]>>("/short/");
    return response.data;
}

export async function updateShortLink(id: string, shortLinkRequest: ShortLinkRequest): Promise<ApiResponse<ShortLinkList>> {
    const response = await api.put<ApiResponse<ShortLinkList>>(`/short/${id}`, shortLinkRequest);
    return response.data;
}

export async function deleteShortLink(id: string): Promise<ApiResponse<null>> {
    const response = await api.delete<ApiResponse<null>>(`/short/${id}`);
    return response.data;
}
