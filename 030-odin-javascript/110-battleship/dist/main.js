(()=>{"use strict";const t={create:function(t,e){const n=t,a=e;return Object.freeze({x:n,y:a,equals:t=>n===t.x&&a===t.y})}};const e={create:function(e){const n=e,a=[];let r=null;const o=t=>a.findIndex((e=>e.equals(t)))>-1;return Object.freeze({getGameboard:()=>n,attack:function(e,i){const c=function(e,n){if(r){let i=r.point.x,c=r.point.y;for(;r.vector<4;){if(0===r.vector&&i++,1===r.vector&&i--,2===r.vector&&c++,3===r.vector&&c--,i<0||i>=e||c<0||c>=n){r.vector++;continue}const s=t.create(i,c);if(!o(s))return a.push(s),s}}return function(e,n){for(;;){const r=Math.floor(Math.random()*e),i=Math.floor(Math.random()*n),c=t.create(r,i);if(!o(c))return a.push(c),c}}(e,n)}(e,i),s=n.registerAttack(c);return s?(r||(r={point:c,vector:0,ship:s}),r.ship.isSunk()&&(r=null)):r&&r.vector++,{point:c,result:s}}})}};const n={create:function(t){const e=t;let n=null,a=!1;return Object.freeze({getCoordinate:()=>e,getShip:()=>n,getHit:()=>a,setShip:t=>n=t,setHit:()=>(a=!0,n?(n.hit(),n):null)})}};const a={create:function(e,a){const r=e,o=a,i=[],c=[];for(let e=0;e<r;e++)for(let a=0;a<o;a++)c.push(n.create(t.create(e,a)));function s(e,n){const a=function(e,n){const a=[];for(let i of n){const n=t.create(e.x+i.x,e.y+i.y);if(n.x>=r||n.y>=o)return null;const c=l(n);if(null!==c.getShip())return null;a.push(c)}return a}(n,e.getOffsets());return!!a&&(function(t,e){t.forEach((t=>t.setShip(e))),i.push(e)}(a,e),!0)}const l=t=>c.find((e=>e.getCoordinate().x===t.x&&e.getCoordinate().y===t.y));return Object.freeze({registerShip:s,registerAttack:function(t){const e=l(t);return e?e.setHit():null},isLive:function(){for(const t of i)if(!t.isSunk())return!0;return!1},placeShipsRandom:function(e){for(let n of e)for(;;){const e=Math.floor(Math.random()*r),a=Math.floor(Math.random()*o);if(s(n,t.create(e,a)))break}},getShips:()=>i})}};const r={create:function(t,e){const n=t,a=e;return Object.freeze({getName:()=>n,getGameboard:()=>a,attack:function(t){return a.registerAttack(t)}})}};function o(e,n){const a=[];for(let r=0;r<e.length;r++)a.push(t.create(e[r],n[r]));return a}function i(t){const e=t;let n=0;return Object.freeze({getLength:()=>e.length,getOffsets:()=>e,getHits:()=>n,isSunk:()=>n>=e.length,hit:()=>n++})}const c={createHorizontal:function(t){const e=[],n=[];for(let a=0;a<t;a++)e.push(a),n.push(0);return i(o(e,n))},createVertical:function(t){const e=[],n=[];for(let a=0;a<t;a++)e.push(0),n.push(a);return i(o(e,n))}},s={form:document.getElementById("new-player-form"),nameInput:document.getElementById("player-name-input"),name:document.getElementById("player-name"),dashboard:document.getElementById("dashboard"),startNewGameButton:document.getElementById("start-new-game-button"),human:{gameboard:document.getElementById("gameboard"),shipHealth:{1:document.getElementById("ship-1-health"),2:document.getElementById("ship-2-health"),3:document.getElementById("ship-3-health"),4:document.getElementById("ship-4-health"),5:document.getElementById("ship-5-health")}},ai:{gameboard:document.getElementById("ai-gameboard"),shipHealth:{1:document.getElementById("ai-ship-1-health"),2:document.getElementById("ai-ship-2-health"),3:document.getElementById("ai-ship-3-health"),4:document.getElementById("ai-ship-4-health"),5:document.getElementById("ai-ship-5-health")}}};let l=null,d=null;function u(e){if(""!==e.target.textContent)return;if(null===l||null===d||!l.getGameboard().isLive()||!d.getGameboard().isLive())return;const n=Number(e.target.id.split("-")[0]),a=Number(e.target.id.split("-")[1]);let r=t.create(n,a);const o=l.attack(r);if(h(),e.target.textContent="X",o)return e.target.classList.add("hit"),h(),void(l.getGameboard().isLive()||(s.name.textContent="VICTORY!"));for(e.target.classList.add("miss");;){const t=d.attack(10,10),e=document.getElementById(`ai-${t.point.x}-${t.point.y}`);if(h(),e.textContent="X",!t.result)return void e.classList.add("miss");e.classList.add("hit"),h(),d.getGameboard().isLive()||(s.name.textContent="You LOSE!")}}function h(){for(let t of d.getGameboard().getShips()){const e=t.getLength();s.human.shipHealth[e].textContent=e-t.getHits(),t.isSunk()&&s.human.shipHealth[e].classList.add("sunk")}for(let t of l.getGameboard().getShips()){const e=t.getLength();s.ai.shipHealth[e].textContent=e-t.getHits(),t.isSunk()&&s.ai.shipHealth[e].classList.add("sunk")}}s.startNewGameButton.addEventListener("click",(function(t){t.preventDefault();const n=a.create(10,10),o=a.create(10,10);n.placeShipsRandom([c.createHorizontal(5),c.createVertical(4),c.createHorizontal(3),c.createVertical(2),c.createHorizontal(1)]),o.placeShipsRandom([c.createHorizontal(5),c.createVertical(4),c.createHorizontal(3),c.createVertical(2),c.createHorizontal(1)]),l=r.create(s.nameInput.value,o),d=e.create(n),s.name.textContent=`Greetings, Captain ${l.getName()}`,h(),s.form.classList.add("hidden"),s.dashboard.classList.remove("hidden")})),function(){s.dashboard.classList.add("hidden"),s.form.classList.remove("hidden");const t=document.createElement("div"),e=document.createElement("div"),n=document.createElement("span");n.textContent="RADAR",e.appendChild(n);for(let n=9;n>=0;n--)for(let a=0;a<10;a++){let r=document.createElement("span");r.id=a+"-"+n,r.classList.add("cell"),r.addEventListener("click",u),t.appendChild(r),r=document.createElement("span"),r.id="ai-"+a+"-"+n,r.classList.add("ai-cell"),e.appendChild(r)}t.id=s.human.gameboard.id,s.human.gameboard.replaceWith(t),e.id=s.ai.gameboard.id,s.ai.gameboard.replaceWith(e)}()})();