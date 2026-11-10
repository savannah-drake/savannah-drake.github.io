/* Project data. `file` is the name shown on the card; `ext` fills the preview when there's no image. */
const projects = [
 {id:'airlines',file:'delay_risk_model.py',ext:'.py',name:'American Airlines Delay Prediction',category:'machine learning',kind:'Machine learning app',short:'Which flight sequences are likely to be disrupted, and why.',desc:'I led a 4-person team working with an American Airlines stakeholder to predict flight-sequence disruptions from flight, crew and weather data. We turned the model results (AUC around 0.66) into a decision-support app that dispatchers and analysts can actually read.',tags:['Python','XGBoost','scikit-learn','NumPy','SQL','Snowflake','Streamlit'],image:'https://savannah-drake.github.io/assets/images/flight_ops_dashboard.png',link:'https://b2-american-airlines-disruption-risk.streamlit.app/',secondary:'https://savannah-drake.github.io/assets/images/flight_ops_dashboard.png',secondaryText:'View the poster',color:'peach'},
 {id:'sprintwheel',file:'sprintwheel.tsx',ext:'.tsx',name:'SprintWheel',category:'full stack',kind:'Full-stack web app',short:'Sprint planning, backlog and deadlines in one place.',desc:'A full-stack agile project management app for planning sprints, organizing a backlog and keeping track of deadlines.',tags:['React','TypeScript','FastAPI','Supabase'],link:'https://sprintwheel-frontend.vercel.app/',color:'lavender'},
 {id:'freshfood',file:'fresh_food_access.geojson',ext:'.geojson',name:'Invest Atlanta Fresh Food Access',category:'geospatial',kind:'Geospatial dashboard',award:'Best Project Poster, Emory AI/Data Lab Symposium',short:'Atlanta neighborhoods with high need and few places to buy fresh food.',desc:'An interactive dashboard with maps, filters and tract-level KPIs across 211 Atlanta census tracts. I built a food-access need index from 8,000+ records covering SNAP participation, poverty, food retail and MARTA access, then used it to flag 53 tracts for targeted investment.',tags:['Python','pandas','GeoPandas','Matplotlib','Streamlit'],image:'https://savannah-drake.github.io/assets/images/ffa_dashboard.png',link:'https://fresh-food-access-dashboard.streamlit.app/',photo:'images/fresh-food-presenting.jpg',photoCaption:'Presenting at Emory\'s AI/Data Lab Symposium, where it won Best Project Poster.',secondary:'https://savannah-drake.github.io/assets/images/ffa_dashboard.png',secondaryText:'View the poster',color:'green'},
 {id:'fifa',file:'fifa26_transit.geojson',ext:'.geojson',name:'FIFA 2026 Transit & Investment',category:'geospatial',kind:'Research poster',short:'Which Atlanta neighborhoods to invest in before the World Cup.',desc:'Random Forest ridership models combined with an analysis of MARTA access and business disinvestment around Mercedes-Benz Stadium. The result: 5 priority Neighborhood Statistical Areas for World Cup 2026 investment planning, built with Invest Atlanta.',tags:['Python','Random Forest','GeoPandas','GIS'],image:'https://savannah-drake.github.io/assets/images/FIFA26_DisinvestmentProject.png',link:'https://savannah-drake.github.io/assets/images/FIFA26_DisinvestmentProject.png',linkText:'View the poster',color:'blue'},
 {id:'ml',file:'ml_pipeline.ipynb',ext:'.ipynb',name:'Machine Learning Analysis',category:'machine learning',kind:'Modeling pipeline',short:'Regression, classification and clustering, compared side by side.',desc:'A modular pipeline for comparing models and explaining the tradeoffs between them in plain terms.',tags:['Python','scikit-learn','Jupyter','Streamlit'],link:'https://savannah-drake-ml-analysis-pipeline-app-m4mgao.streamlit.app/',color:'yellow'},
 {id:'spotify',file:'spotify_clusters.py',ext:'.py',name:'Spotify Audio Clustering',category:'machine learning',kind:'Unsupervised learning app',short:'Grouping songs by how they actually sound.',desc:'Clusters songs by their audio features, then lets you explore which tracks and genres end up sounding alike.',tags:['Python','K-means','Streamlit'],link:'https://savannah-drake--spotify-audio-clustering-app-8d3lfi.streamlit.app/',color:'pink'}
];

const sections = {
 projects:{title:'projects',crumb:'Projects',status:'Click a project to see the details.'},
 about:{title:'about_me',crumb:'About me',status:'Scroll down, then pass or check at the bottom.',count:'1 profile'},
 experience:{title:'experience',crumb:'Experience',status:'Last updated November 2026.',count:'4 items'},
 skills:{title:'toolkit',crumb:'Toolkit',status:'Project names open the project.',count:'1 file'},
 contact:{title:'new message',crumb:'Contact',status:'Sends from your own email app.',count:''},
 video:{title:'ootd_internship_edition.mov',crumb:'ootd_internship_edition.mov',status:'OOTD: internship edition.',count:'1 file'},
 trash:{title:'trash',crumb:'Trash',status:'Emptying the trash is disabled. These stay as a reminder.',count:'4 items'}
};
const EMAIL='sidrake10@outlook.com';

const win=document.getElementById('app-window'),content=document.getElementById('window-content'),title=document.getElementById('window-title'),crumb=document.getElementById('breadcrumb'),count=document.getElementById('toolbar-count'),status=document.getElementById('status-description');
let current='home',selected=null,filter='all',history=[];
let aboutSeen=false,sequenceTimers=[],activeDialog=null,lastTrigger=null;

function escapeHtml(str){return String(str).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
const reducedMotion=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;

function openSection(section,save=true){
 win.querySelector('.match-toast')?.remove();
 if(section==='home'){closeAll();return;}
 if(!sections[section])section='projects';
 if(section!=='about')clearSequence();
 if(save&&current!==section&&current!=='home')history.push(current);
 current=section;selected=null;
 win.classList.add('is-active');win.focus({preventScroll:true});
 const s=sections[section];
 title.textContent=s.title;crumb.textContent='Desktop / '+s.crumb;count.textContent=s.count||'';status.textContent=s.status;
 const frag=document.getElementById(section+'-template').content.cloneNode(true);
 if(section==='about')wirePhotos(frag);
 content.querySelectorAll('video').forEach(v=>v.pause());
 content.replaceChildren(frag);content.scrollTop=0;
 if(section==='projects')renderProjects();
 if(section==='contact')wireCompose();
 if(section==='about'&&!aboutSeen)startAboutSequence();
 document.querySelectorAll('.dock button[data-open]').forEach(b=>b.classList.toggle('dock-selected',b.dataset.open===section));
}

/* About me profile: hide any photo that fails to load. */
function wirePhotos(root){
 root.querySelectorAll('img[data-photo]').forEach(img=>img.addEventListener('error',()=>img.closest('figure').remove()));
}

/* Check / Pass on the profile */
function toast(message,action,target){
 win.querySelector('.match-toast')?.remove();
 const t=document.createElement('div');t.className='match-toast';t.setAttribute('role','status');
 const m=document.createElement('p');m.textContent=message;
 const go=document.createElement('button');go.type='button';go.className='primary-btn';go.textContent=action;go.dataset.open=target;
 const x=document.createElement('button');x.type='button';x.className='text-btn';x.textContent='Keep looking';x.addEventListener('click',()=>t.remove());
 t.append(m,go,x);win.append(t);go.focus({preventScroll:true});
}

function renderProjects(){
 const grid=document.getElementById('project-grid');if(!grid)return;
 const visible=projects.filter(p=>filter==='all'||p.category===filter);
 grid.innerHTML=visible.map(p=>`<button class="project-card" data-project="${p.id}" aria-label="${escapeHtml(p.name)}">
  <div class="project-preview ${p.color}">${p.image?`<img src="${escapeHtml(p.image)}" alt="" loading="lazy" onerror="this.remove()">`:''}<span class="preview-ext">${escapeHtml(p.ext)}</span></div>
  <div class="card-details"><span class="file-name">${escapeHtml(p.file)}</span>${p.award?`<span class="award">&#9733; Best Project Poster</span>`:''}<h3>${escapeHtml(p.name)}</h3><p>${escapeHtml(p.short)}</p></div></button>`).join('');
 count.textContent=`${visible.length} item${visible.length===1?'':'s'}`;
 document.querySelectorAll('.filter').forEach(el=>el.classList.toggle('is-selected',el.dataset.filter===filter));
 document.querySelectorAll('[data-count]').forEach(el=>{const c=el.dataset.count;el.textContent=projects.filter(p=>c==='all'||p.category===c).length;});
 if(selected&&!visible.some(p=>p.id===selected))hideProject();
}

function showProject(id){
 const p=projects.find(p=>p.id===id);if(!p)return;selected=id;
 const detail=document.getElementById('project-detail');detail.hidden=false;
 document.getElementById('project-grid').classList.add('has-detail');
 detail.innerHTML=`<button class="detail-back" id="detail-back">&larr; All projects</button>
 <div class="detail-hero ${p.color}">${p.image?`<img src="${escapeHtml(p.image)}" alt="Preview of ${escapeHtml(p.name)}" onerror="this.remove()">`:''}<span class="preview-ext">${escapeHtml(p.ext)}</span></div>
 <span class="file-name">${escapeHtml(p.file)} &middot; ${escapeHtml(p.kind)}</span>
 <h2>${escapeHtml(p.name)}</h2>${p.award?`<span class="award">&#9733; ${escapeHtml(p.award)}</span>`:''}<p>${escapeHtml(p.desc)}</p>
 ${p.photo?`<figure class="detail-photo"><img src="${escapeHtml(p.photo)}" alt="${escapeHtml(p.photoCaption)}" loading="lazy" onerror="this.closest('figure').remove()"><figcaption>${escapeHtml(p.photoCaption)}</figcaption></figure>`:''}
 <h3 class="detail-label">Built with</h3><div class="detail-tags">${p.tags.map(t=>`<span>${escapeHtml(t)}</span>`).join('')}</div>
 <div class="detail-actions"><a class="primary-btn" href="${escapeHtml(p.link)}" target="_blank" rel="noopener noreferrer">${escapeHtml(p.linkText||'Open the live app')}</a>${p.secondary?`<a class="secondary-btn" href="${escapeHtml(p.secondary)}" target="_blank" rel="noopener noreferrer">${escapeHtml(p.secondaryText)}</a>`:''}</div>
 <p class="external-note">Opens in a new tab.</p>`;
 status.textContent=p.name;
 content.scrollTop=0;
 document.getElementById('detail-back').focus({preventScroll:true});
}
function hideProject(){selected=null;const detail=document.getElementById('project-detail');if(detail){detail.hidden=true;document.getElementById('project-grid').classList.remove('has-detail');}if(current==='projects')status.textContent=sections.projects.status;}

function wireCompose(){
 const form=document.getElementById('compose-form');
 form.addEventListener('submit',e=>{e.preventDefault();
  const subject=document.getElementById('compose-subject').value.trim()||'Hello';
  const body=document.getElementById('compose-body').value.trim();
  location.href=`mailto:${EMAIL}?subject=${encodeURIComponent(subject)}${body?`&body=${encodeURIComponent(body)}`:''}`;
 });
 document.getElementById('copy-email').addEventListener('click',async e=>{
  const btn=e.currentTarget;
  try{await navigator.clipboard.writeText(EMAIL);btn.textContent='Copied';}
  catch{btn.textContent=EMAIL;}
  setTimeout(()=>{btn.textContent='Copy address';},2200);
 });
}

document.addEventListener('click',event=>{
 const open=event.target.closest('[data-open]');if(open){event.preventDefault();openSection(open.dataset.open);return;}
 const go=event.target.closest('[data-goto]');if(go){filter='all';openSection('projects');showProject(go.dataset.goto);return;}
 const item=event.target.closest('[data-project]');if(item){showProject(item.dataset.project);return;}
 const filt=event.target.closest('[data-filter]');if(filt){filter=filt.dataset.filter;hideProject();renderProjects();return;}
 if(event.target.closest('#detail-back')){hideProject();return;}
 if(event.target.closest('#replay-errors')){startAboutSequence();return;}
 if(event.target.closest('#profile-like')){toast('Looks like a good fit.','Send her a message','contact');return;}
 if(event.target.closest('#profile-pass')){toast('Before you go: she has six live projects.','See the projects','projects');return;}
});
document.getElementById('close-window').addEventListener('click',closeAll);
document.getElementById('min-window').addEventListener('click',closeAll);
document.getElementById('max-window').addEventListener('click',()=>{if(document.fullscreenElement)document.exitFullscreen?.();else document.documentElement.requestFullscreen?.().catch(()=>{});});
document.getElementById('back-button').addEventListener('click',()=>{if(current==='projects'&&selected){hideProject();return;}const prev=history.pop();if(prev)openSection(prev,false);else closeAll();});
document.addEventListener('keydown',event=>{if(event.key!=='Escape')return;if(activeDialog)skipAboutSequence();else if(selected)hideProject();else closeAll();});

document.getElementById('year').textContent=new Date().getFullYear();
const clockFmt=new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit',timeZone:'America/New_York'});
function setTime(){document.getElementById('clock').textContent=clockFmt.format(new Date());}
setTime();setInterval(setTime,30000);

/* Hero: the name types itself, with one human typo */
(function typeName(){
 const h=document.querySelector('.type-name'),out=document.getElementById('typed');
 if(!h||!out)return;
 if(reducedMotion()){h.classList.add('is-done');return;}
 // each step: [text to show, pause before the next step in ms]
 const steps=[];let t='';
 const type=(str,base=95)=>{for(const ch of str){t+=ch;steps.push([t,base+Math.random()*70+(ch===' '?140:0)]);}};
 const back=n=>{for(let i=0;i<n;i++){t=t.slice(0,-1);steps.push([t,70]);}};
 type('Savan');type('ha',80);steps[steps.length-1][1]=420; // typo, notice it
 back(2);type('nah Drake');
 out.textContent='';let i=0;
 (function next(){if(i>=steps.length){h.classList.add('is-done');return;}out.textContent=steps[i][0];setTimeout(next,steps[i++][1]);})();
 // a beat before the first key
})();

/* About me: one-time "system check" popups */
const errorLayer=document.getElementById('error-layer');
let popupDepth=130,deskDepth=4;
function clearSequence(){sequenceTimers.forEach(clearTimeout);sequenceTimers=[];errorLayer.replaceChildren();activeDialog=null;win.removeAttribute('inert');}
function closeAll(){win.querySelector('.match-toast')?.remove();content.querySelectorAll('video').forEach(v=>v.pause());clearSequence();current='home';history=[];selected=null;win.classList.remove('is-active');document.querySelectorAll('.dock button[data-open]').forEach(b=>b.classList.remove('dock-selected'));if(lastTrigger)lastTrigger.focus({preventScroll:true});}
function delay(fn,ms){sequenceTimers.push(setTimeout(fn,ms));}
function errorWindow(file,heading,message,offsetX,offsetY,isFinal=false){
 const pop=document.createElement('div');pop.className='error-popup'+(isFinal?' error-final':'');pop.style.zIndex=String(++popupDepth);pop.setAttribute('role','dialog');pop.setAttribute('aria-label',heading);
 const bar=document.createElement('div');bar.className='error-titlebar';
 const caption=document.createElement('span');caption.textContent=file;
 const dismiss=document.createElement('button');dismiss.type='button';dismiss.textContent='×';dismiss.className='error-dismiss';dismiss.setAttribute('aria-label','Skip the system check');dismiss.addEventListener('click',skipAboutSequence);
 bar.append(caption,dismiss);
 const body=document.createElement('div');body.className='error-body';
 const h=document.createElement('h2');h.textContent=heading;const p=document.createElement('p');p.textContent=message;body.append(h,p);
 if(isFinal){const proceed=document.createElement('button');proceed.type='button';proceed.className='proceed-button';proceed.textContent='Proceed anyway';proceed.addEventListener('click',skipAboutSequence);body.append(proceed);}
 pop.append(bar,body);errorLayer.append(pop);
 const maxX=Math.max(8,innerWidth-pop.offsetWidth-8),maxY=Math.max(65,innerHeight-pop.offsetHeight-90);
 pop.style.left=Math.min(maxX,Math.max(8,(innerWidth-pop.offsetWidth)/2+offsetX))+'px';
 pop.style.top=Math.min(maxY,Math.max(65,(innerHeight-pop.offsetHeight)/2+offsetY))+'px';
 makeDraggable(pop,bar);activeDialog=pop;if(isFinal)pop.querySelector('.proceed-button').focus();return pop;
}
const FINAL=['verify_human.exe','I am not a robot.','Checked twice. Just a person who likes data and likes making it look good.'];
function startAboutSequence(){
 clearSequence();aboutSeen=true;win.setAttribute('inert','');
 if(reducedMotion()){errorWindow(...FINAL,0,0,true);return;}
 delay(()=>errorWindow('scan_user.exe','Scan complete','Interests detected: data, design, beauty, culture, technology. Expected: one.',-110,-125),250);
 delay(()=>errorWindow('job_title.exe','Could not assign a job title','Tried: analyst, engineer, designer. All three partially matched.',95,-35),850);
 delay(()=>errorWindow('browser.exe','Too many tabs','Several of them are Streamlit apps she built herself.',-60,65),1450);
 delay(()=>errorWindow(...FINAL,0,0,true),2400);
}
function skipAboutSequence(){clearSequence();if(win.classList.contains('is-active'))win.focus({preventScroll:true});}

/* Dragging: popups, and the sticky note + polaroid on the desktop */
function makeDraggable(element,handle){
 let sx=0,sy=0,left=0,top=0,dragging=false;
 handle.addEventListener('pointerdown',e=>{
  if(e.button!==0||e.target.closest('button,a,input,textarea')||innerWidth<=650)return;
  const r=element.getBoundingClientRect(),parent=element.offsetParent?element.offsetParent.getBoundingClientRect():{left:0,top:0};
  sx=e.clientX;sy=e.clientY;left=r.left-parent.left;top=r.top-parent.top;
  element.style.left=left+'px';element.style.top=top+'px';element.style.right='auto';element.style.bottom='auto';element.style.transform=element.classList.contains('desk-object')?'rotate(var(--r))':'none';element.style.margin='0';
  if(element.classList.contains('desk-object'))element.style.zIndex=String(++deskDepth);
  dragging=true;element.classList.add('is-dragging');handle.setPointerCapture(e.pointerId);
 });
 handle.addEventListener('pointermove',e=>{
  if(!dragging)return;
  element.style.left=(left+e.clientX-sx)+'px';element.style.top=Math.max(element.classList.contains('desk-object')?0:56,top+e.clientY-sy)+'px';
 });
 const stop=()=>{dragging=false;element.classList.remove('is-dragging');};
 handle.addEventListener('pointerup',stop);handle.addEventListener('pointercancel',stop);
}
document.querySelectorAll('.desk-object').forEach(el=>makeDraggable(el,el));

document.addEventListener('pointerdown',e=>{const t=e.target.closest('[data-open]');if(t)lastTrigger=t;},true);
