document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.review-photo[data-review-initial]').forEach(photo=>{
    function showInitial(){
      const fallback=document.createElement('span');
      fallback.className='review-photo-placeholder';
      fallback.setAttribute('aria-hidden','true');
      fallback.textContent=photo.dataset.reviewInitial;
      photo.replaceWith(fallback);
    }
    photo.addEventListener('error',showInitial,{once:true});
    if(photo.complete&&photo.naturalWidth===0)showInitial();
  });
  const tabs=[...document.querySelectorAll('.module-tabs [role="tab"]')];
  const panels=tabs.map(tab=>document.getElementById(tab.getAttribute('aria-controls')));
  function activateTab(index,focus=false){
    tabs.forEach((tab,i)=>{const selected=i===index;tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;panels[i].hidden=!selected});
    if(focus)tabs[index].focus();
  }
  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>activateTab(index));
    tab.addEventListener('keydown',event=>{
      if(event.key==='ArrowRight'||event.key==='ArrowLeft'){
        event.preventDefault();
        activateTab((index+(event.key==='ArrowRight'?1:tabs.length-1))%tabs.length,true);
      }
    });
  });
  document.querySelectorAll('[data-review-carousel]').forEach(carousel=>{
    const slides=[...carousel.querySelectorAll('[data-review-slide]')];
    const dots=[...carousel.querySelectorAll('[data-review-dot]')];
    const position=carousel.querySelector('.review-position');
    let current=0;
    function show(index){
      current=(index+slides.length)%slides.length;
      slides.forEach((slide,i)=>{slide.hidden=i!==current;});
      dots.forEach((dot,i)=>{dot.setAttribute('aria-current',String(i===current));});
      position.textContent=`${current+1} of ${slides.length}`;
    }
    carousel.querySelector('[data-review-prev]').addEventListener('click',()=>show(current-1));
    carousel.querySelector('[data-review-next]').addEventListener('click',()=>show(current+1));
    dots.forEach((dot,index)=>dot.addEventListener('click',()=>show(index)));
    carousel.addEventListener('keydown',event=>{
      if(event.altKey||event.ctrlKey||event.metaKey)return;
      if(event.key==='ArrowLeft'){event.preventDefault();show(current-1);}
      if(event.key==='ArrowRight'){event.preventDefault();show(current+1);}
    });
  });
});
