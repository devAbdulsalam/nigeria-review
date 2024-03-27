(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{266:function(t,e,n){"use strict";n.r(e);n(154);var r={name:"UiPagination",props:{maxVisibleButtons:{type:Number,required:!1,default:5},totalPages:{type:Number,required:!0},total:{type:Number,required:!0},perPage:{type:Number,required:!0},currentPage:{type:Number,required:!0}},computed:{startPage:function(){return 1===this.currentPage?1:this.currentPage===this.total?this.total:this.currentPage-1},pages:function(){for(var t=[],i=this.startPage;i<=Math.min(this.startPage+this.maxVisibleButtons-1,this.total);i+=1)t.push({name:i,isDisabled:i===this.currentPage});return t},isInFirstPage:function(){return 1===this.currentPage},isInLastPage:function(){return this.currentPage===this.total}},methods:{onClickPreviousPage:function(){this.$emit("pagechanged",this.currentPage-1)},onClickPage:function(t){this.$emit("pagechanged",t)},onClickNextPage:function(){this.$emit("pagechanged",this.currentPage+1)},isPageActive:function(t){return this.currentPage===t}}},l=n(3),component=Object(l.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",{staticClass:"flex flex-wrap items-center justify-center"},[n("li",{staticClass:"inline-block mr-2 mt-2"},[n("button",{staticClass:"btn-paginate",attrs:{type:"button",disabled:t.isInFirstPage},on:{click:t.onClickPreviousPage}},[n("i",{staticClass:"fas fa-chevron-left"})])]),t._v(" "),t._l(t.pages,(function(e){return n("li",{key:e.name,staticClass:"inline-block mr-2 mt-2"},[n("button",{staticClass:"btn-paginate",class:{"bg-primary text-white":t.isPageActive(e.name)},attrs:{type:"button",disabled:e.isDisabled},on:{click:function(n){return t.onClickPage(e.name)}}},[t._v("\n      "+t._s(e.name)+"\n    ")])])})),t._v(" "),n("li",{staticClass:"inline-block mr-2 mt-2"},[n("button",{staticClass:"btn-paginate",attrs:{type:"button",disabled:t.isInLastPage},on:{click:t.onClickNextPage}},[n("i",{staticClass:"fas fa-chevron-right"})])])],2)}),[],!1,null,null,null);e.default=component.exports},316:function(t,e,n){"use strict";n.r(e);var r={name:"BlogPost",props:{imagePath:{type:String,required:!0},post:{type:Object,required:!0}}},l=n(3),component=Object(l.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"w-full flex sm:w-1/2 lg:w-1/3 sm:px-2 mb-4"},[n("nuxt-link",{staticClass:"w-full flex",attrs:{to:"blog/"+t.post.slug}},[n("div",{staticClass:"w-full card overflow-hidden"},[n("div",{staticClass:"relative pb-2/3"},[n("img",{staticClass:"absolute h-full w-full object-cover",attrs:{src:t.imagePath+t.post.imgurl,alt:t.post.title}})]),t._v(" "),n("div",{staticClass:"py-4 px-6"},[n("h2",{staticClass:"text-gray-900 text-sm font-semibold"},[t._v("\n          "+t._s(t.post.title)+"\n        ")])])])])],1)}),[],!1,null,null,null);e.default=component.exports},346:function(t,e,n){"use strict";n.r(e);n(20);var r=n(2),l={asyncData:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,l,o,data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.app,r=t.error,l=t.query,e.prev=1,o=l.page,e.next=5,n.$axios.$get("/blog?page=".concat(o||1));case 5:return data=e.sent,e.abrupt("return",{posts:data.data,imagePath:data.defaultpath,currentPage:data.page,totalPage:data.total,perPage:data.rows});case 9:e.prev=9,e.t0=e.catch(1),r(e.t0);case 12:case"end":return e.stop()}}),e,null,[[1,9]])})))()},watchQuery:!0,data:function(){return{}},methods:{onPageChanged:function(t){this.$router.push("/blog?page=".concat(t))}},head:function(){return{title:"80kobosms - Blog"}}},o=n(3),component=Object(o.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",[n("div",{staticClass:"container py-8"},[n("h1",{staticClass:"text-lg md:text-2xl text-center font-bold"},[t._v("From The Blog")]),t._v(" "),n("p",{staticClass:"text-center mt-1"},[t._v("An overview of our blog content")]),t._v(" "),n("div",{staticClass:"flex flex-wrap sm:-mx-2 mt-5"},t._l(t.posts,(function(e){return n("blog-post",{key:e.id,attrs:{post:e,"image-path":t.imagePath}})})),1),t._v(" "),t.perPage<t.totalPage?n("ui-pagination",{staticClass:"my-6",attrs:{"current-page":t.currentPage,"per-page":t.perPage,"total-pages":t.totalPage,total:Math.ceil(t.totalPage/t.perPage)},on:{pagechanged:t.onPageChanged}}):t._e()],1)])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{BlogPost:n(316).default,UiPagination:n(266).default})}}]);