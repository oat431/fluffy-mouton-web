import api from "../utils/APIClient";
import type {
    ShortLinkRequest,
} from "../types/ShortLinkRequest";
import type {
    ShortLinkList,
} from "../types/ShortLinkDto";
import type { ApiResponse } from "../types/ApiResponse";

export async function createRandomShortLink(shortLinkRequest: ShortLinkRequest): Promise<ApiResponse<ShortLinkList>> {
    const response = await api.post<ApiResponse<ShortLinkList>>("/short-link/random", shortLinkRequest);
    return response.data;
}

export async function createCustomShortLink(shortLinkRequest: ShortLinkRequest): Promise<ApiResponse<ShortLinkList>> {
    const response = await api.post<ApiResponse<ShortLinkList>>("/short-link/custom", shortLinkRequest);
    return response.data;
}

export async function getShortLinks(): Promise<ApiResponse<ShortLinkList[]>> {
    const response = await api.get<ApiResponse<ShortLinkList[]>>("/short-link/");
    return response.data;
}
