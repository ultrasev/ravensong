import {
  space_grotesk,
  goblin,
  comfortaa,
  berkshire,
  zen_maru_gothic,
  zen_old_mincho,
  shippori_mincho_b1,
  protest_guerrilla,
  acclonica,
  courier_prime,
  eagle_lake,
  young_serif,
  nabla,
  hachi_maru_pop,
  noto_serif_sc,
} from "@/app/ui/Font";

export default function FontsShowcase() {
  const sampleText = "The quick brown fox jumps over the lazy dog";

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Font Showcase</h1>

      <div className="grid gap-6">
        <div className={`${young_serif.variable} font-young-serif p-4 border rounded`}>
          <p className="text-xl">{sampleText}</p>
          <p className="text-sm mt-2 text-gray-500">Font: Young Serif</p>
        </div>

        <div className={`${eagle_lake.variable} font-eagle-lake p-4 border rounded`}>
          <p className="text-xl">{sampleText}</p>
          <p className="text-sm mt-2 text-gray-500">Font: Eagle Lake</p>
        </div>

        <div className={`${nabla.variable} font-nabla p-4 border rounded`}>
          <p className="text-xl">{sampleText}</p>
          <p className="text-sm mt-2 text-gray-500">Font: Nabla</p>
        </div>

        <div className={`${courier_prime.variable} font-courier-prime p-4 border rounded`}>
          <p className="text-xl">{sampleText}</p>
          <p className="text-sm mt-2 text-gray-500">Font: Courier Prime</p>
        </div>

        <div className={`${acclonica.variable} font-acclonica p-4 border rounded`}>
          <p className="text-xl">{sampleText}</p>
          <p className="text-sm mt-2 text-gray-500">Font: Aclonica</p>
        </div>

        <div className={`${protest_guerrilla.variable} font-protest-guerrilla p-4 border rounded`}>
          <p className="text-xl">{sampleText}</p>
          <p className="text-sm mt-2 text-gray-500">Font: Protest Guerrilla</p>
        </div>

        <div className={`${hachi_maru_pop.variable} font-hachi-maru-pop p-4 border rounded`}>
          <p className="text-xl">{sampleText}</p>
          <p className="text-sm mt-2 text-gray-500">Font: Hachi Maru Pop</p>
        </div>

        <div className={`${noto_serif_sc.variable} font-noto-serif-sc p-4 border rounded`}>
          <p className="text-xl">{sampleText}</p>
          <p className="text-sm mt-2 text-gray-500">Font: Noto Serif SC</p>
        </div>

        <div className={`${shippori_mincho_b1.variable} font-shippori-mincho-b1 p-4 border rounded`}>
          <p className="text-xl">{sampleText}</p>
          <p className="text-sm mt-2 text-gray-500">Font: Shippori Mincho B1</p>
        </div>

        <div className={`${zen_old_mincho.variable} font-zen-old-mincho p-4 border rounded`}>
          <p className="text-xl">{sampleText}</p>
          <p className="text-sm mt-2 text-gray-500">Font: Zen Old Mincho</p>
        </div>

        <div className={`${zen_maru_gothic.variable} font-zen-maru-gothic p-4 border rounded`}>
          <p className="text-xl">{sampleText}</p>
          <p className="text-sm mt-2 text-gray-500">Font: Zen Maru Gothic</p>
        </div>

        <div className={`${berkshire.variable} font-berkshire p-4 border rounded`}>
          <p className="text-xl">{sampleText}</p>
          <p className="text-sm mt-2 text-gray-500">Font: Berkshire Swash</p>
        </div>

        <div className={`${goblin.variable} font-goblin p-4 border rounded`}>
          <p className="text-xl">{sampleText}</p>
          <p className="text-sm mt-2 text-gray-500">Font: Goblin One</p>
        </div>

        <div className={`${comfortaa.variable} font-comfortaa p-4 border rounded`}>
          <p className="text-xl">{sampleText}</p>
          <p className="text-sm mt-2 text-gray-500">Font: Comfortaa</p>
        </div>

        <div className={`${space_grotesk.variable} font-space-grotesk p-4 border rounded`}>
          <p className="text-xl">{sampleText}</p>
          <p className="text-sm mt-2 text-gray-500">Font: Space Grotesk</p>
        </div>
      </div>
    </div>
  );
}
