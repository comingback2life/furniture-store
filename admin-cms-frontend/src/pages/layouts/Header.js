import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch } from 'react-redux';
import { toggleSideBar } from '../../system-state/systemSlice';
export const Header = () => {
	const dispatch = useDispatch();
	return (
		<div>
			<Navbar bg="none" expand="md" className="p-3">
				<Container>
					<Button
						variant="btn-outline"
						onClick={() => {
							dispatch(toggleSideBar());
						}}
					>
						<i className="fa-solid fa-bars"></i>
					</Button>
					<LinkContainer to="/">
						<Navbar.Brand>Furniture Store Admin</Navbar.Brand>
					</LinkContainer>

					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							<Link to="/admin/register" className="nav-link">
								Register
							</Link>

							<Link to="/admin/login " className="nav-link">
								Login
							</Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
};
