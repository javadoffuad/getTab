function getTab(settings){
    var container;
    this.active = 1;
    this.settings = settings || [];

    function renderTabs(){
        container.empty();
        
        var spriteTab = $("<div>")
                .addClass("tab-t__tab-sprite")
                .appendTo(container);
        var spriteContent = $("<div>")
                .addClass("tab-t__content-sprite")
                .appendTo(container);
        
        $.each(this.settings, function(i){
            var tab = $("<button>")
                .addClass("btn tab-t__item")
                .text(this.title)
                .attr("data-id", ++i)
                .appendTo(spriteTab);
        
            var content = $("<div>").addClass("tab-t__content")
                    .html(this.content)
                    .attr("data-id", "tab-" + i)
                    .appendTo(spriteContent);
        });
        
        container.on("click", ".btn:not(.is-active)", function(e){
            this.activate($(e.currentTarget).data("id"));
        }.bind(this));
    }
    
    this.newTab = function (item){
        this.settings.push(item);
        renderTabs.call(this);
    };
    
    this.getElement = function(){
        this.activate(this.active);
        return container;
    };
    
    this.activate = function(ID){
        this.active = (ID < 1 || ID > this.settings.length) ? this.active : ID;
        container.find(".btn").removeClass("is-active");
        container.find(".tab-t__content").removeClass("open");
        container.find(".btn[data-id=" +this.active+ "]").addClass("is-active");
        container.find(".tab-t__content[data-id=tab-" +this.active+ "]").addClass("open");
    };
    
    (function(){
        if(!container){
            container = $("<div>").addClass("tab-t");
            renderTabs.call(this);
        }
        return container;
    }).bind(this)();
}
