const cars=[...document.querySelectorAll('.car')];
let activeCar=null;
const money=n=>Number(n).toLocaleString('en-US');
function updateFilters(){
 const search=document.getElementById('searchInput').value.toLowerCase().trim();
 const active=document.querySelector('.filter-btn.active')?.dataset.filter||'all';
 cars.forEach(card=>{
  const matchesSearch=card.dataset.car.toLowerCase().includes(search);
  const favorite=JSON.parse(localStorage.getItem('bmwFavorites')||'[]').includes(card.dataset.car);
  const matchesFilter=active==='all'||active===card.dataset.category||(active==='favorite'&&favorite);
  card.classList.toggle('hidden',!(matchesSearch&&matchesFilter));
 });
}
function saveFavorites(){
 const list=cars.filter(c=>c.querySelector('.favorite').classList.contains('saved')).map(c=>c.dataset.car);
 localStorage.setItem('bmwFavorites',JSON.stringify(list));
 updateFilters();
}
function loadFavorites(){
 const list=JSON.parse(localStorage.getItem('bmwFavorites')||'[]');
 cars.forEach(c=>{if(list.includes(c.dataset.car)){c.querySelector('.favorite').classList.add('saved');c.querySelector('.favorite').textContent='♥';}});
}
function openModal(card){
 activeCar=card;
 document.getElementById('modalImage').src=card.dataset.image;
 document.getElementById('modalType').textContent=card.dataset.type;
 document.getElementById('modalTitle').textContent=card.dataset.car;
 document.getElementById('modalEngine').textContent=card.dataset.engine;
 document.getElementById('modalHp').textContent=card.dataset.hp;
 document.getElementById('modalZero').textContent=card.dataset.zero;
 document.getElementById('modalSpeed').textContent=card.dataset.speed;
 document.getElementById('modalPrice').textContent=money(card.dataset.price)+' EGP';
 document.getElementById('modal').classList.add('show');
}
function closeModal(){document.getElementById('modal').classList.remove('show');}
function bookFromModal(){
 if(activeCar){document.getElementById('carInput').value=activeCar.dataset.car;closeModal();document.getElementById('book').scrollIntoView({behavior:'smooth'});document.querySelector('#book input[name="name"]').focus();}
}
function calculateLoan(){
 const price=Math.max(0,parseFloat(document.getElementById('calcPrice').value)||0);
 const down=Math.min(price,Math.max(0,parseFloat(document.getElementById('calcDownPayment').value)||0));
 const rate=Math.max(0,parseFloat(document.getElementById('calcRate').value)||0);
 const years=parseInt(document.getElementById('calcYears').value)||1;
 const principal=price-down;
 const monthlyRate=rate/100/12;
 const months=years*12;
 const monthly=monthlyRate===0?principal/months:principal*monthlyRate*Math.pow(1+monthlyRate,months)/(Math.pow(1+monthlyRate,months)-1);
 const total=monthly*months;
 document.getElementById('calcResult').textContent='Estimated Monthly: '+Math.round(monthly).toLocaleString()+' EGP';
 document.getElementById('calcExtra').textContent='Total Payment: '+Math.round(total).toLocaleString()+' EGP  •  Total Interest: '+Math.max(0,Math.round(total-principal)).toLocaleString()+' EGP';
}
function setupCompare(){
 const selects=[document.getElementById('compare1'),document.getElementById('compare2'),document.getElementById('compare3')];
 cars.forEach(c=>selects.forEach(s=>s.add(new Option(c.dataset.car,c.dataset.car))));
 selects.forEach(s=>s.addEventListener('change',renderCompare));
}
function renderCompare(){
 const names=[document.getElementById('compare1').value,document.getElementById('compare2').value,document.getElementById('compare3').value].filter(Boolean);
 const selected=names.map(n=>cars.find(c=>c.dataset.car===n));
 if(!selected.length){document.getElementById('compareTable').innerHTML='';return;}
 const rows=[['Price','price'],['Engine','engine'],['Power','hp'],['0–100 km/h','zero'],['Top Speed','speed'],['Type','type']];
 document.getElementById('compareTable').innerHTML='<table><thead><tr><th>Specification</th>'+selected.map(c=>'<th>'+c.dataset.car+'</th>').join('')+'</tr></thead><tbody>'+rows.map(r=>'<tr><td>'+r[0]+'</td>'+selected.map(c=>'<td>'+(r[1]==='price'?money(c.dataset[r[1]])+' EGP':c.dataset[r[1]])+'</td>').join('')+'</tr>').join('')+'</tbody></table>';
}
document.querySelectorAll('.filter-btn').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');updateFilters();}));
document.getElementById('searchInput').addEventListener('input',updateFilters);
cars.forEach(card=>{
 card.querySelector('.details-btn').addEventListener('click',()=>openModal(card));
 card.querySelector('.favorite').addEventListener('click',e=>{e.stopPropagation();const b=e.currentTarget;b.classList.toggle('saved');b.textContent=b.classList.contains('saved')?'♥':'♡';saveFavorites();});
 card.addEventListener('dblclick',()=>openModal(card));
});
document.getElementById('bookingForm').addEventListener('submit',e=>{
 e.preventDefault();
 const form=e.currentTarget;
 const carInput=document.getElementById('carInput');
 if(!carInput.value){alert('Please select a BMW first.');return;}
 const booking={
  id:Date.now(),
  name:form.querySelector('[name="name"]').value.trim(),
  phone:form.querySelector('[name="phone"]').value.trim(),
  car:carInput.value,
  timestamp:new Date().toLocaleString()
 };
 if(!booking.name||!booking.phone){alert('Please complete all fields.');return;}
 const bookings=JSON.parse(localStorage.getItem('bmwBookings')||'[]');
 bookings.push(booking);
 localStorage.setItem('bmwBookings',JSON.stringify(bookings));
 const bookedCar=booking.car;
 form.reset();
 carInput.value='';
 document.getElementById('bookingSummary').textContent='Test drive request for '+bookedCar+' has been saved.';
 document.getElementById('popup').classList.add('show');
});
document.getElementById('themeToggle').addEventListener('click',()=>{document.body.classList.toggle('light');localStorage.setItem('bmwTheme',document.body.classList.contains('light')?'light':'dark');});
function closePopup(){document.getElementById('popup').classList.remove('show');}
window.addEventListener('load',()=>{loadFavorites();setupCompare();calculateLoan();setTimeout(()=>document.getElementById('loader').classList.add('hide'),900);});
window.addEventListener('click',e=>{if(e.target.id==='modal')closeModal();if(e.target.id==='popup')closePopup();});
if(localStorage.getItem('bmwTheme')==='light')document.body.classList.add('light');
