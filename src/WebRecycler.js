class WebRecycler extends HTMLElement{
    adapter = null; dataSize = 0;;
    container; holders = [];firstTime = false;
    constructor(){
        super();
        // just
        this.container = document.createElement('div');
        this.observer = new IntersectionObserver((entries,observer)=>{
            for (let i = 0; i < entries.length; i++) {
                const entrie = entries[i];
                if (entrie.target.firstTime) {
                    entrie.target.firstTime = false;
                }else{
                    if (entrie.isIntersecting) {
                        console.log("INTER");
                        if (entrie.rootBounds.bottom<=entrie.boundingClientRect.bottom) {
                            // come in from bottom side
                            let last = this.container.lastElementChild;
                            let p = last.position + 1;
                            if(p < this.dataSize){
                                let holder = this.getHolder();
                                this.adapter.onBindData(p,holder);
                                this.container.appendChild(holder);
                                holder.position = p;
                                if (holder.firstTime === undefined) {
                                    this.observer.observe(holder);
                                    holder.firstTime = true;
                                }
                            }
                        }else{
                            // come in from top side
                            let last = this.container.firstElementChild;
                            let p = last.position - 1;
                            if(p>=0){
                                let holder = this.getHolder();
                                this.adapter.onBindData(p,holder);
                                this.container.insertBefore(holder,last);
                                holder.position = p;
                                if (holder.firstTime === undefined) {
                                    this.observer.observe(holder);
                                    holder.firstTime = true;
                                }
                            }
                        }
                    }else{
                        console.log("OUT");
                        if (entrie.rootBounds.bottom<=entrie.boundingClientRect.bottom) {
                            // go out from bottom side
                            let last = this.container.lastElementChild;
                            if (entrie.rootBounds.bottom + 200 <= last.getBoundingClientRect().top) {
                                last.remove();
                                this.holders.push(last);
                            }
                        }else{
                            // come out from top side
                            let first = this.container.firstElementChild;
                            if (entrie.rootBounds.top - 200 >= first.getBoundingClientRect().bottom) {
                                first.remove();
                                this.holders.push(first);
                            }
                        }
                    }
                }
            }
        },{root:this});
    }
    setAdapter(adap){
        console.log("setAdapter");
        this.adapter = adap;
        this.dataSize = adap.getItemSize();
        if (this.isConnected) {
            if(0<this.dataSize) this.createAtFirstTime();
        }
    }
    connectedCallback(){
        this.appendChild(this.container);
        if(this.adapter !== null) {
            this.dataSize = this.adapter.getItemSize();
            if(0<this.dataSize) this.createAtFirstTime();
        }
    }
    createAtFirstTime(){
        let position = 0;
        while (this.container.clientHeight < this.clientHeight + 200 && position < this.dataSize) {
            let holder = this.getHolder();
            this.container.appendChild(holder);
            this.adapter.onBindData(position,holder);
            holder.position = position;
            if (holder.firstTime === undefined) {
                this.observer.observe(holder);
                holder.firstTime = true;
            }
            position++;
        }
    }
    getHolder(){
        let holder = this.holders.pop();
        if(!holder){
            holder = this.adapter.onCreateNode();
        }   
        return holder;
    }
}
customElements.define('web-recycler',WebRecycler);
export class WRAdapter {
    constructor(){}
    onCreateNode(){}
    onBindData(position,holder){}
    getItemSize(){}
}
// export class NodeHolder{
//     itemNode;
//     constructor(root){
//         console.log("INDEX W");
//         this.itemNode = root;
//         console.log(this.itemNode);
//     }
// }
