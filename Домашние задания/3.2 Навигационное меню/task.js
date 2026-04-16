const menuLinks = document.querySelectorAll('.menu__link');

for (let link of menuLinks) {
    link.onclick = function() {
        const menuItem = this.closest('.menu__item');
        const subMenu = menuItem.querySelector('.menu_sub');
        const currentMenu = this.closest('.menu');
        
        if (subMenu) {
            const allSubMenus = currentMenu.querySelectorAll('.menu_sub');
            for (let menu of allSubMenus) {
                if (menu !== subMenu && menu.classList.contains('menu_active')) {
                    menu.classList.remove('menu_active');
                }
            }
            
            subMenu.classList.toggle('menu_active');
            return false;
        }
    };
}