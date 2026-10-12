(function(){
// Make read-only record tables usable on narrow screens. Existing buttons remain authoritative.
const mq=window.matchMedia('(max-width:800px)');let queued=false;
function lists(){queued=false;for(const table of document.querySelectorAll('.archive-table,.stock-table')){
 if(table.querySelector('input,select,textarea'))continue;
 let list=table.nextElementSibling;if(!list?.classList.contains('pr-mobile-list')){list=document.createElement('div');list.className='pr-mobile-list';table.after(list)}
 const headers=[...table.querySelectorAll('thead th')].map(h=>h.textContent.trim());list.replaceChildren();
 if(!mq.matches){table.classList.remove('pr-mobile-source');continue}table.classList.add('pr-mobile-source');
 for(const row of table.querySelectorAll('tbody tr')){const card=document.createElement('article');card.className='pr-mobile-card';
 for(const [i,cell] of [...row.cells].entries()){const field=document.createElement('div');field.className='pr-mobile-field';const label=document.createElement('span');label.textContent=headers[i]||'İşlemler';const content=document.createElement('div');content.innerHTML=cell.innerHTML;content.querySelectorAll('[id]').forEach(e=>e.removeAttribute('id'));const originals=[...cell.querySelectorAll('button,a')];for(const [j,btn] of [...content.querySelectorAll('button,a')].entries()){btn.removeAttribute('onclick');btn.onclick=e=>{e.preventDefault();originals[j]?.click()}}field.append(label,content);card.append(field)}list.append(card)}
 }}
function schedule(){if(!queued){queued=true;setTimeout(lists,80)}}
const watch=new MutationObserver(records=>{if(records.some(r=>!r.target.closest?.('.pr-mobile-list')&&(r.target.closest?.('.archive-table,.stock-table')||[...r.addedNodes,...r.removedNodes].some(n=>n.nodeType===1&&(n.matches?.('table,tr,td')||n.querySelector?.('.archive-table,.stock-table'))))))schedule()});
watch.observe(document.body,{childList:true,subtree:true});mq.addEventListener?.('change',schedule);lists();
})();
