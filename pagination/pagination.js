const Pagination = (length, page, paginate) => {
    const lastPage = Math.ceil(length / paginate);
    const currentPage = Math.min(page, lastPage);
    const to = Math.min(currentPage * paginate, length);
    const from = length === 0 ? 0 : (currentPage - 1) * paginate + 1;

    return {
        paginate: paginate,
        to: to,
        from: from,
        total: length,
        per_page: paginate,
        current_page: currentPage,
        last_page: lastPage,
    }
}

// Example usage:
// console.log(pagination(69, 1, 15));

module.exports = Pagination;