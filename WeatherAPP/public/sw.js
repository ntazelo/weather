let cacheName='assets-v4'
let dynamic='dynamic-v4'

self.addEventListener('install',(event)=>{
    console.log('app cachin servc')
   event.waitUntil(
       caches.open(cacheName)
       .then((cache)=>{
           cache.addAll([
               '/',
               'src/js/weather.js',
               'page.html',
               'src/js/app.js',
               'src/css/app.css',
])

       })
   )
})

self.addEventListener('activate',(event)=>{
    console.log('srvc activate')
    event.waitUntil(
        caches.keys().then((key)=>{
            return Promise.all(key.map((key)=>{
               if(key !== cacheName && key !==dynamic){
                   return caches.delete(key)
               }
            }))

        }
        )
    )
       return self.clients.claim()
})

self.addEventListener('fetch',(event)=>{

   
    event.respondWith( caches.match(event.request)
    .then((res)=>{
      if(res){
          return res
      }else{
          return fetch(event.request)
          .then((res)=>{
              return caches.open(dynamic)
              .then((cache)=>{
                  cache.put(event.request.url,res.clone())
                  return res
                     })
          })
          .catch((err)=>{

          })}
})) 
})




