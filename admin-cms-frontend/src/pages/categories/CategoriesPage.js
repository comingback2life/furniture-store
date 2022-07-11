import React from 'react';
import CategoryForm from '../../components/cat-form/CategoryForm';
import CategoryTable from '../../components/cat-table/CategoryTable';
import AdminLayout from '../layouts/AdminLayout';
const CategoriesPage = () => {
	return (
		<AdminLayout>
			{/* form */}
			<CategoryForm />

			<hr />
			{/* table */}
			<CategoryTable />
		</AdminLayout>
	);
};
export default CategoriesPage;
