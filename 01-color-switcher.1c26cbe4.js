const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");t.addEventListener("click",(()=>{const d=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`,t.disabled=!0,e.disabled=!1}),1e3);e.addEventListener("click",(()=>{clearInterval(d),t.disabled=!1,e.disabled=!0}))}));
//# sourceMappingURL=01-color-switcher.1c26cbe4.js.map
