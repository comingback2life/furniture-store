import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ProductForm } from '../../components/product-form/ProductForm.js';
import ProductTable from '../../components/product-table/ProductTable.js';
import AdminLayout from '../layouts/AdminLayout.js';

const EditProductPage = () => {
	return (
		<AdminLayout>
			<div className="">
				<Link to="/products">
					<Button variant="none" className=" mb-2">
						<i className="fa-solid fa-chevron-left"></i> Product Listing
					</Button>
				</Link>
			</div>
			<h3 className="mt-2 mb-4 text-center">Edit Product</h3>
			<hr />
			<ProductForm />
		</AdminLayout>
	);
};
export default EditProductPage;
