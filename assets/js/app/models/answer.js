define(function(require,exports, module){
    
    var _        = require('libs/underscore'),
        Backbone = require('libs/backbone'),
        $        = require('libs/jquery');

    module.exports = Backbone.Model.extend({
        url : function() {
            var base = 'index.php/answers/edit/';
            return base + this.get("step");
        },
        initialize : function () {
            this.template = '';
            this.bind('change:step', this.saveF2e);
        },
        setCache   : function () {
            var data = this.Cache,
                o    = {
                    users  : data.users,
                    topics : data.topic,
                    test   : data.test
                };
            this.set(o);
            this.template  = data.template;
        },
        //缓存数据
        cacheData  : function () {
            var Cache = this.Cache;
            if (  'cached' in Cache ) {
                this.setCache();
            }
        },
        //保存已经添加过的数据
        _seleted   : {},
        saveF2e    : function () {
            var step = parseInt(this.get('step'), 10);
            var topicId = this.get("topic").id;

            var topics  = this.get('topics');
            var topicIdNow = topics[step - 1].id;

            //保存
            //当使用退回时，因为前面题目都引用了this.get("aChoose"),也就是attributes中的
            //aChoose，随意当this.attributes.aChoose改变时，所有的数据都跟着改变了
            //这里必须使用clone
            this._seleted[topicId] = _.clone(this.get("aChoose"));

            //new choose
            this.set({
                aChoose : this._seleted[topicIdNow] || []
            });

            //console.log(this._seleted, this.get('aChoose'));
        },
        //进入下一步，数据准备
        goNext     : function () {
        },
        setJson    : function () {
            var self  = this,
                step  = this.get('step');
            if( this.get("error") ) {
                this.trigger('error', this.get("error"));
            } else {
                if( 'answers' in this.attributes ) {
                    this._seleted = this.attributes['answers'];
                    delete this.attributes['answers'];
                }

                _.each(this.get("users"), function (user) {
                    var in_array = false;
                    _.each(self.get("aChoose"), function (id) {
                        if( user.id == id ){
                            in_array = true;
                        }
                    });
                    if(in_array)
                        user.selected = true;
                    else
                        user.selected = false;
                });
                var num = this.get("topicNum"),
                    obj = { 
                        'topic'  : self.get("topics")[step - 1], 
                        stepBack : true, 
                        backUrl  : self.get("step") - 1,
                        stepNext : true, 
                        nextUrl  : parseInt(self.get("step"), 10) + 1,
                        //用户名随机排序
                        users    : this.get("users").sort(function () { return 0.5 - Math.random(); }) 
                    };
                if( step == 1 ) {
                    obj.stepBack = false;
                } else if( step == num ) {
                    obj.stepNext = false;
                }
                self.set( obj );
            }
        },
        selectUser  : function (id) {
            var aChoose = this.get('aChoose');
            id   = parseInt(id,10);
            aChoose.push(parseInt(id, 10) );
            this.set({'aChoose': aChoose});
        },
        deleteUser  : function (id) {
            var aChoose = this.get('aChoose');
            id   = parseInt(id,10);
            this.set({
                'aChoose' : _.reject(aChoose, function (num) { num = parseInt(num,10); return id == num; })
            });
        },
        isFull      : function () {
            return this.get("aChoose").length >= this.get("topic").tocMax;
        },
        getMax      : function () {
            return this.get("topic").tocMax;
        },
        //发送数据到服务器前，只保留需要的attributes
        filter      : function (attrs) {
            var attributes = this.attributes;
            var Cache      = this.Cache;
            _(attributes).each(function (attr,field) {
                if( _.indexOf(attrs, field) == -1) {
                    Cache[field]  = attr;
                    delete attributes[field];
                }
            });
            Cache.cached  = true;
        }

    });
});
