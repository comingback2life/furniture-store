import React from 'react';
import CategoryForm from '../../components/cat-form/CategoryForm';
import CategoryTable from '../../components/cat-table/CategoryTable';
import AdminLayout from '../layouts/AdminLayout';
const CategoriesPage = () => {
	return (
		<AdminLayout>
			{/* form */}
			<h3 className="mt-2 mb-4 text-center">Categories</h3>
			<CategoryForm />

			<hr />
			{/* table */}
			<CategoryTable />
		</AdminLayout>
	);
};
export default CategoriesPage;
