function announcementClick() {
    window.open('https://ko-fi.com/wonderfulsubs');
    err(function () {
        ga('send', {
            hitType: 'event',
            eventCategory: 'Top Announcement',
            eventAction: 'Click',
            eventLabel: 'Become A Supporter',//title,
            eventValue: 2557916,//id,
        });
    });
}


var Sidebar = {
    view: function () {
        // var sidebarStyles = m('style', '.content-wrapper-container.flex{margin:0 auto;flex-direction:column-reverse}@media only screen and (min-width:1000px){.content-wrapper-container.flex{flex-direction:row;padding-top:0.3em}}');
        var blogPosts = m(BloggerList, { url: 'https://blog.wonderfulsubs.com/feeds/posts/summary?alt=json&max-results=5', title: 'From the Blog' });

        return m.fragment({}, [
            m.fragment({}, [
                llv('div', { class: 'sidebar-top-announcement pointer', onclick: announcementClick }, [
                    m("ins.adsbygoogle[data-ad-client='ca-pub-7274415743225662'][data-ad-format='" + ((window.innerWidth > 998) ? 'vertical,' : '') + "rectangle,horizontal'][data-ad-slot='6251333500'][data-full-width-responsive='true']", {
                        style: { "display": "block" }, backup_style: convertObjToStyles({ "display": "block" }), oncreate: function (vnode) {
                            window.addEventListener('resize', function() {
                                var currentVal = vnode.dom.attributes['data-ad-format'].value;
                                if (window.innerWidth > 998 && (currentVal !== 'vertical,rectangle,horizontal')) {
                                    vnode.dom.attributes['data-ad-format'].value = 'vertical,rectangle,horizontal';
                                } else if (window.innerWidth <= 998 && (currentVal !== 'rectangle,horizontal')) {
                                    vnode.dom.attributes['data-ad-format'].value = 'rectangle,horizontal';
                                }
                            });
                        }
                    })
                ]),
                m('div', { class: "OUTBRAIN", 'data-src': window.location.href, 'data-widget-id': 'GS_6', oncreate: function() {
                    var s = document.createElement('script');
                    s.src = '//widgets.outbrain.com/outbrain.js';
                    s.async = true;
                    document.head.appendChild(s);
                } }),
                blogPosts,
                m('div', { class: 'animated fadeInUp slower' }, '© ' + (new Date()).getFullYear() + ' WonderfulSubs LLC')
                // llv('iframe', { src: 'https://discordapp.com/widget?id=386361030353354765&theme=light', width: '100%', height: '500', allowtransparency: 'true', frameborder: '0' })
            ]),
            // sidebarStyles
        ]);
    }
};