class map{
    /*
        Data structure used to track objects in the canvas.
        to make collision detection faster.
    */
    constructor(){
        this.sorted_array = []; // array to store Y coordinates in sorted order.
    }
    getNextBigElementIndex(n){
        // Binary search O(log n)
        if(this.sorted_array.length==0) return 0;
        // binary search
        let left = 0;
        let right = this.sorted_array.length-1;
        while(left<right){
            let mid = left+Math.floor((right-left)/2);
            if(this.sorted_array[mid].y>=n){
                right=mid;
            }
            else
            {
                left=mid+1;
            }
        }
        if(left===right){
            if(this.sorted_array[left].y>=n) return left;
            else return left+1;
        }
    }
    insert(obj){
        /*
            parameter obj expected to have x, y, height and width properties.
        */
        // binary search and insert O(n)
        this.sorted_array.splice(this.getNextBigElementIndex(obj.y),0,obj)
    }
    getCollisions(obj,enemy_height,enemy_width){
        // o(n)
        let left = obj.x - enemy_width; // to cover elements that start behind and end inside the object
        let right = obj.x+obj.width;
        let top = obj.y - enemy_height;
        let bottom = obj.y+obj.height;
        let res=[];
        let start = this.getNextBigElementIndex(left);
        for(let i=start;i<this.sorted_array;i++){
            if(this.sorted_array[i].y>bottom) break;
            if(this.sorted_array[i].x>=left && this.sorted_array[i].x<=right) res.push(this.sorted_array[i]);
        }
        return res;
    }
}