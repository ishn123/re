function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'short', year: '2-digit' };
    return date.toLocaleDateString('en-GB', options).replace(/ /g, '-');
  }

export const columns = [
    {
      id:'id',
      accessorKey: 'id',
      header: 'id',
      size:5
    },
    {
      id:'name',
      accessorKey: 'name',
      header: 'Name',
      size:20
    },
    {
      id:'category',
      accessorKey: 'category',
      header: 'Category',
      size:20
    },
    {
      id:'sub category',
      accessorKey: 'subcategory',
      header: 'Subcategory',
      size:20
    },
    {
      accessorFn: (row) => formatDate(row.createdAt),
        id: 'createdat',
        header: 'Created At',
        accessorKey:"createdAt",
        size:20
    },
    {
      accessorFn: (row) => formatDate(row.updatedAt),
        id: 'updatedat',
        header: 'Updated At',
        accessorKey:"updatedAt",
        size:20
    },
    {
        id:'price',
        accessorKey: 'price',
        header: 'Price',
        size:5
    },
    {
      id:'sale_price',
      accessorKey: 'sale_price',
      header: 'Sales Price',
      size:5
    },
  ];




