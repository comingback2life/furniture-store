import React from 'react';
import { Container } from 'react-bootstrap';
import { AdminSidebar } from '../../components/admin-sidebar/AdminSidebar.js';
import { Footer } from './Footer';
import { Header } from './Header';

const AdminLayout = ({ children }) => {
	return (
		<div>
			<Header />
			<AdminSidebar />
			<Container>
				<main className="main">{children}</main>
			</Container>
			<Footer />
		</div>
	);
};
export default AdminLayout;
