import { Menu } from './menu.model';

export const verticalMenuItems = [ 
    new Menu (1, 'Login', '/', null, 'exit_to_app', null, false, 40),    
    new Menu (2, 'Register', '/register', null, 'person_add', null, false, 40),
    new Menu (3, 'Dashboard', '/page/dashboard', null, 'dashboard', null, false, 0),
    new Menu (4, 'Users', '/page/users', null, 'supervisor_account', null, false, 0), 
    
]

export const horizontalMenuItems = [ 
    new Menu (1, 'Login', '/', null, 'exit_to_app', null, false, 40),    
    new Menu (2, 'Register', '/register', null, 'person_add', null, false, 40),
    new Menu (3, 'Dashboard', '/page/dashboard', null, 'dashboard', null, false, 0),
    new Menu (4, 'Users', '/page/users', null, 'supervisor_account', null, false, 0), 
    
]