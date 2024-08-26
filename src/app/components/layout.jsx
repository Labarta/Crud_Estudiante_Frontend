/* eslint-disable react/jsx-no-duplicate-props */
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from 'next/image';
import Logo from "./logo.png";
//Icons//
import CardTravelIcon from '@mui/icons-material/CardTravel';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BusinessIcon from '@mui/icons-material/Business';
import StoreIcon from '@mui/icons-material/Store';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';

//Rutas//
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';


const drawerWidth = 240;

const menuItems = [
  { title: 'Facturas', icon: <AssignmentIcon /> },
  { title: 'Clientes', icon: <PeopleIcon /> },
  { title: 'Cobros', icon: <MonetizationOnIcon /> },    
];

const compras = [
  { title: 'Facturas de Compra', icon: <AssignmentIcon /> },
  { title: 'Proveedor', icon: <PeopleIcon /> },
  { title: 'Pagos', icon: <MonetizationOnIcon /> },
  { title: 'Proveedores', icon: <BusinessIcon /> },
  
];

function Layout(props) {
  const { window } = props;
  const { children } = props;  
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [isCollapse, setIsCollapse] = React.useState(false);
  const [isClosing2, setIsClosing2] = React.useState(false);
  const [isCollapse2, setIsCollapse2] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  console.log('Pathname: ', pathname)

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };


  const handleCollapse = () => {
    if (!isClosing) {
        setIsCollapse(!isCollapse);
    }
  };

  const compraCollapse = () => {
    if (!isClosing2) {
        setIsCollapse2(!isCollapse2);
    }
  };

  const [activeItem, setActiveItem] = React.useState(null);

  const drawer = (
    <div>
      <Toolbar>
        <Image src={Logo} alt="logo" width={45} height={45} className='-ml-2 mr-2'/>
        <Typography variant="h6" noWrap component="div">
            IGSystem
          </Typography>
      </Toolbar>
      <Divider />
      <List>
        {['Alumno', 'Profesor','Grado','Seccion'].map((text, index) => (
          <ListItem key={text} disablePadding
          className={pathname.startsWith("/" + text.toLowerCase())? "text-sky-600 bg-slate-100":"text-slate-700"}
          onClick={()=>{router.push("/"+text.toLowerCase())}}
          >
            <ListItemButton>
              <ListItemIcon className={pathname.startsWith("/" + text.toLowerCase())? "text-sky-600 bg-slate-100":"text-slate-700"}>
                {index  === 0 && <PersonIcon />}
                {index  === 1 && <SchoolIcon />} 
                {index  === 2 && <BookIcon />} 
                {index  === 3 && <DashboardIcon />} 
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        
        
      </List>
      
      <Collapse in={isCollapse} timeout="auto" unmountOnExit>
      <List className='ml-6'>
      {menuItems.map((item, index) => (
          <ListItem  key={index}  disablePadding
          onMouseEnter={() => setActiveItem(index)}
          onMouseLeave={() => setActiveItem(null)}
          style={{ backgroundColor: activeItem === index ? 'lightblue' : 'transparent' }}
          className={pathname.startsWith("/" + item.title.toLowerCase())? "text-sky-600 bg-slate-100":"text-slate-700"}
          //onClick={()=>{router.push("/"+menuItems.title.toLowerCase())}}
           >
            <ListItemButton>
              <ListItemIcon className={pathname.startsWith("/" + item.icon)? "text-sky-600 bg-slate-100":"text-slate-700"}>
              {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      </Collapse>

       
        
      <Collapse in={isCollapse2} timeout="auto" unmountOnExit>
      <List className='ml-6'>
      {compras.map((item, index) => (
          <ListItem  key={index}  disablePadding
          onMouseEnter={() => setActiveItem(index)}
          onMouseLeave={() => setActiveItem(null)}
          style={{ backgroundColor: activeItem === index ? 'lightblue' : 'transparent' }}
           >
            <ListItemButton>
              <ListItemIcon>
              {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      </Collapse>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Colegio
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <main>{children}</main>
        
      </Box>
    </Box>
  );
}

Layout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
  children: PropTypes.array,
};

export default Layout;
