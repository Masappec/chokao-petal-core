const posts = [
  {
    author: "CHOKAO Oficial",
    initials: "CH",
    time: "Hace 2 horas",
    text: "🍫 ¡El chocolate ecuatoriano brilla en el mundo! Este año tendremos delegaciones de 12 países visitando nuestra feria. ¡Prepárense para una experiencia única! 🌍🔥",
    image: null,
  },
  {
    author: "CHOKAO Oficial",
    initials: "CH",
    time: "Hace 5 horas",
    text: "📢 ¡Confirmado! El Chef Carlos Vera dará una masterclass exclusiva sobre temperado artesanal. Cupos limitados, no te lo pierdas 👨‍🍳✨",
    image: null,
  },
  {
    author: "CHOKAO Oficial",
    initials: "CH",
    time: "Ayer",
    text: "🎉 ¡Ya superamos los 500 inscritos! Gracias a toda la comunidad cacaotera por confiar en CHOKAO. Nos vemos en junio 🙌🍫",
    image: null,
  },
];

const NewsFeed = () => {
  return (
    <div className="mt-7 px-5">
      <h2 className="font-semibold text-[18px] text-white">Novedades</h2>
      <p className="text-[13px] mt-1 mb-4" style={{ color: "rgba(240,236,217,0.5)" }}>
        Actualizaciones oficiales del evento
      </p>

      <div className="space-y-3">
        {posts.map((post, i) => (
          <div
            key={i}
            className="rounded-2xl p-4"
            style={{ backgroundColor: "#1a2f42" }}
          >
            {/* Author row */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                style={{
                  border: "2px solid #fbba30",
                  backgroundColor: "#102132",
                  color: "#f0ecd9",
                }}
              >
                {post.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-[14px]">{post.author}</p>
              </div>
              <span className="text-[12px] flex-shrink-0" style={{ color: "rgba(240,236,217,0.4)" }}>
                {post.time}
              </span>
            </div>

            {/* Content */}
            <p className="text-[14px] leading-relaxed" style={{ color: "rgba(240,236,217,0.8)" }}>
              {post.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
