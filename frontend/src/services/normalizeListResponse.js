export default function normalizeListResponse(response) {
  return {
    data: Array.isArray(response?.data) ? response.data : [],
    pagination: response?.pagination || { page: 1, limit: response?.data?.length || 0, totalItems: response?.data?.length || 0, totalPages: 1 },
  };
}
