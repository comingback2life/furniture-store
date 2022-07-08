import React from 'react';
import { AdminSidebar } from '../../components/admin-sidebar/AdminSidebar.js';
import { Footer } from './Footer';
import { Header } from './Header';

const AdminLayout = ({ children }) => {
	return (
		<div>
			<Header />
			<AdminSidebar />
			<main className="main">{children}</main>
			<Footer />
		</div>
	);
};
export default AdminLayout;
