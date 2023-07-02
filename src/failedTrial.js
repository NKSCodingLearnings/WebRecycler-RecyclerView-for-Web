poplateChilds = (position)=>{

    // let ph = this.clientHeight;
    // let ch = this.container.clientHeight;
    // console.log("RecyclerViewHeight = "+ph);

    // while (this.container.clientHeight < this.clientHeight + 200 && this.position < this.dataSize) {
        let holder = this.getHolder();
        this.adapter.onBindData(position,holder);
        this.container.appendChild(holder);
        holder.position = position;
        if (!holder.observer) {
            // this.observer.observe(holder);
            holder.observer = true;
        }
    // }
}


// let t = entries[0];
            // let inter = t.isIntersecting;
            // if (inter && this.container.clientHeight < this.clientHeight + 250) {
            //     let p = this.container.lastElementChild.position + 1;
            //     console.log(p);
            //     if (p<this.dataSize) {
            //         this.poplateChilds(p);
            //     }
            // }else if(inter){
            //     let last = this.container.lastElementChild;
            //     if(t.target === last){
            //         let p = last.position +1;
            //         if (p<this.dataSize) {
            //             this.poplateChilds(p);
            //         }
            //     }else{
            //         let first = this.container.firstElementChild;
            //         let p = first.position - 1;
            //         if (p>=0) {
            //             let holder = this.getHolder();
            //             this.adapter.onBindData(p,holder);
            //             this.container.insertBefore(holder,first);
            //             holder.position = p;
            //             if (!holder.observer) {
            //                 this.observer.observe(holder);
            //                 holder.observer = true;
            //             }
            //         }
            //     }
            // }else {
            //     if(y==3){
            //         let tl = t.target;
            //         tl.remove();
            //         if(this.container.firstElementChild == tl){
            //             this.container.style.paddingTop = this.container.style.paddingTop + tl.clientHeight +10;
            //         }
            //         this.holders.push(tl);
            //     }else{
            //         let p = this.container.lastElementChild.position + 1;
            //         console.log(p);
            //         if (p<this.dataSize) {
            //             this.poplateChilds(p);
            //         }
            //         y++;
            //     }
            // }