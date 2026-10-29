(function(){
  const navs=[...document.querySelectorAll('header nav')];
  navs.forEach((nav,index)=>{
    const projectLink=[...nav.querySelectorAll('a')].find(link=>link.textContent.trim()==='Projects');
    if(!projectLink||projectLink.closest('.projects-nav-item'))return;
    const item=document.createElement('div');
    item.className='projects-nav-item';
    const button=document.createElement('button');
    button.type='button';
    button.className='projects-nav-toggle';
    const currentPage=projectLink.getAttribute('aria-current');
    if(currentPage)button.setAttribute('aria-current',currentPage);
    button.setAttribute('aria-expanded','false');
    const menuId=`projects-menu-${index+1}`;
    button.setAttribute('aria-controls',menuId);
    button.innerHTML='Projects <span aria-hidden="true">⌄</span>';
    const menu=document.createElement('div');
    menu.className='projects-nav-menu';
    menu.id=menuId;
    menu.hidden=true;
    menu.innerHTML='<a href="/projects/physical-design.html">Physical Design Projects</a><a href="/projects/design-verification.html">Design Verification Projects</a>';
    item.append(button,menu);
    projectLink.replaceWith(item);
    const hoverEnabled=window.matchMedia('(hover: hover) and (pointer: fine)');
    const hoverAllowed=()=>hoverEnabled.matches&&window.matchMedia(
      item.closest('.inner-header')?'(min-width: 981px)':'(min-width: 761px)'
    ).matches;
    let openedByHover=false;
    const closeMenu=()=>{
      button.setAttribute('aria-expanded','false');
      menu.hidden=true;
    };
    const openMenu=()=>{
      document.querySelectorAll('.projects-nav-toggle[aria-expanded="true"]').forEach(other=>{
        if(other===button)return;
        other.setAttribute('aria-expanded','false');
        const otherMenu=document.getElementById(other.getAttribute('aria-controls'));
        if(otherMenu)otherMenu.hidden=true;
      });
      button.setAttribute('aria-expanded','true');
      menu.hidden=false;
    };
    item.addEventListener('pointerenter',event=>{
      if(hoverAllowed()&&event.pointerType==='mouse'){
        openedByHover=true;
        openMenu();
      }
    });
    item.addEventListener('pointerleave',event=>{
      openedByHover=false;
      if(hoverAllowed()&&event.pointerType==='mouse'&&!item.contains(document.activeElement))closeMenu();
    });
    item.addEventListener('focusout',event=>{
      if(!item.contains(event.relatedTarget)&&!item.matches(':hover'))closeMenu();
    });
    button.addEventListener('click',event=>{
      if(event.detail>0&&openedByHover&&button.getAttribute('aria-expanded')==='true'){
        openedByHover=false;
        return;
      }
      openedByHover=false;
      const opening=button.getAttribute('aria-expanded')!=='true';
      if(opening)openMenu();else closeMenu();
    });
    button.addEventListener('keydown',event=>{
      if(event.key==='Escape'&&!menu.hidden){event.preventDefault();closeMenu();button.focus();}
      if(event.key==='ArrowDown'||event.key==='ArrowUp'){
        event.preventDefault();
        openMenu();
        const links=menu.querySelectorAll('a');
        links[event.key==='ArrowDown'?0:links.length-1]?.focus();
      }
    });
    menu.addEventListener('keydown',event=>{
      if(event.key==='Escape'){
        event.preventDefault();closeMenu();button.focus();
      } else if(['ArrowDown','ArrowUp','Home','End'].includes(event.key)){
        event.preventDefault();
        const links=[...menu.querySelectorAll('a')];
        const current=links.indexOf(document.activeElement);
        const next=event.key==='Home'?0:event.key==='End'?links.length-1:
          (current+(event.key==='ArrowDown'?1:links.length-1))%links.length;
        links[next]?.focus();
      }
    });
  });
  document.addEventListener('click',event=>{
    if(event.target.closest('.projects-nav-item'))return;
    document.querySelectorAll('.projects-nav-toggle[aria-expanded="true"]').forEach(button=>{
      button.setAttribute('aria-expanded','false');
      const menu=document.getElementById(button.getAttribute('aria-controls'));
      if(menu)menu.hidden=true;
    });
  });
  document.addEventListener('keydown',event=>{
    if(event.key!=='Escape')return;
    const openButtons=[...document.querySelectorAll('.projects-nav-toggle[aria-expanded="true"]')];
    if(!openButtons.length)return;
    openButtons.forEach(button=>{
      button.setAttribute('aria-expanded','false');
      const menu=document.getElementById(button.getAttribute('aria-controls'));
      if(menu)menu.hidden=true;
    });
    openButtons[0].focus();
  });
  const innerSwitch=document.querySelector('.inner-header .nav-switch');
  if(innerSwitch){
    const desktop=window.matchMedia('(min-width: 981px)');
    const closeInnerMenu=()=>{innerSwitch.checked=false;};
    document.addEventListener('keydown',event=>{
      if(event.key==='Escape'&&innerSwitch.checked){
        closeInnerMenu();
        innerSwitch.focus();
      }
    });
    document.addEventListener('click',event=>{
      if(innerSwitch.checked&&!event.target.closest('.inner-header'))closeInnerMenu();
    });
    innerSwitch.addEventListener('change',()=>{
      if(!innerSwitch.checked){
        document.querySelectorAll('.inner-header .projects-nav-toggle[aria-expanded="true"]').forEach(button=>{
          button.setAttribute('aria-expanded','false');
          const menu=document.getElementById(button.getAttribute('aria-controls'));
          if(menu)menu.hidden=true;
        });
      }
    });
    desktop.addEventListener('change',event=>{if(event.matches)closeInnerMenu();});
  }
})();
