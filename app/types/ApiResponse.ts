// Generic API response wrapper
export interface ApiResponse<T> {
    data: T | null;
    status: "SUCCESS" | "FAIL" | "ERROR";
    error: ApiError | null;
}

export interface ApiError {
    http_code: number;
    error_code: string;
    message: string;
}

