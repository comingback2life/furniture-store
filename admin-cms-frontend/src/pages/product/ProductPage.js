import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductTable from '../../components/product-table/ProductTable.js';
import AdminLayout from '../layouts/AdminLayout.js';

const ProductPage = () => {
	return (
		<AdminLayout>
			<h3 className="mt-2 mb-4 text-center">Products</h3>
			<div className="text-end">
				<Link to="/product/new">
					<Button className="btn btn-dark">
						<i className="fa-solid fa-plus"></i> Add New Product
					</Button>
				</Link>
			</div>
			<hr />
			<div className="product-list">
				<ProductTable />
			</div>
		</AdminLayout>
	);
};
export default ProductPage;
