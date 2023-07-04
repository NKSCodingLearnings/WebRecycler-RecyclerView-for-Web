import './style.css';
import { WRAdapter } from "./WebRecycler.js";

class Adapter extends WRAdapter{
  constructor(){
    super();
  }
  onCreateNode(){
    let root = document.createElement('div'); root.classList.add('post');
    root.innerHTML = '<img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?fit=crop&w=320" alt=""><div style="margin:10px;"><span class="post-title"></span><span class="post-desc"></span><a class="post-btn" href="">Read More</a></div>';
    let p = root.querySelector('.post-title'); p.textContent = "Hi";
    root.postTitle = root.querySelector('.post-title');
    root.desc = root.querySelector('.post-desc');
    return root;
  }
  onBindData(postion,holder){
    holder.postTitle.textContent = "This is title "+(postion+1);
    holder.desc.innerHTML = "This is description <b>"+(postion+1)+'</b>.<br>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore vitae soluta ullam perspiciatis facilis illum aut similique, eius est alias aperiam sint dolore eum ipsum aliquam dignissimos ipsa iste, doloremque at? Quod aperiam recusandae, sunt error, porro officiis, sapiente fugiat cumque incidunt excepturi expedita ad voluptates natus mollitia facere voluptatem?';
  }
  getItemSize(){
    return 1000;
  }
} 


const webRecycler = document.getElementById("webRecycler");
const adapter = new Adapter();
webRecycler.setAdapter(adapter);


