const dynamicCacheName = "cache-v6";

self.addEventListener("install", () => {
  console.log("installed.");
});

self.addEventListener("activate", (evt) => {
  console.log("activated.");
  evt.waitUntil(
    caches.keys().then((keys) => {
      console.log("cache keys: ", keys);
      keys.forEach((key) => {
        key !== dynamicCacheName && caches.delete(key);
      });
    })
  );
});

const fakeRequest = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(new Response(JSON.stringify({ name: "ikoy" })));
    }, 1000);
  });

self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    // evt.request.url === "https://swapi.dev/api/people/1"
    //   ? Promise.resolve(new Response(JSON.stringify({ name: "ikoy" })))
    //   : fetch(evt.request)
    caches.match(evt.request).then(
      (response) =>
        response ||
        fetch(evt.request).then((res) => {
          return caches.open(dynamicCacheName).then((cache) => {
            if (evt.request.url === "https://swapi.dev/api/people/1") {
              cache.put(evt.request, res.clone());
            }
            return res;
          });
        })
    )
  );
});

self.addEventListener("push", (evt) => {
  console.log("push Event: ", evt);
  const title = "Title Here..";
  const body = "Body Here..";
  const tag = "Promotion..";
  const icon = "/icons/icons-72x72.png";

  console.log("notification permission status: ", Notification.permission);
  if (Notification.permission !== "granted") return;

  evt.waitUntil(
    self.registration.showNotification(title, {
      icon,
      body,
      tag,
    })
  );
});
