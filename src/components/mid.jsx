import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiX } from "react-icons/fi";
import { DiCode } from "react-icons/di";
import {
  DndContext,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import ConveyorBelt from "./tasma"

const items = [
  { name: "Żwir", description: "Żwir do betonu i drenażu.",source:"/loader_folder/zwir.jpg" },
  { name: "Kruszywo", description: "Pod fundamenty." ,source:"/loader_folder/kruszywa-drogowe.jpg"},
  { name: "Podbudowa", description: "Pod drogi i place.",source:"/loader_folder/podbudowa.jpg" },
  { name: "Piasek", description: "Do zapraw i tynków.",source:"/loader_folder/piasek.jpg" },
  { name: "Gruz", description: "Dekoracyjne kruszywo.",source:"/loader_folder/gruz.jpg" },
  { name: "Tłuczeń", description: "Utwardzanie dróg.",source:"/loader_folder/Tluczen.jpg" },
];

const uslugi = [
  {
    name: "Transport",
    description: "Dostarczymy materiał na miejsce.",
    extra: "Transport dostępny na życzenie.",
  },
  {
    name: "Załadunek",
    description: "Usługi załadunkowe.",
    extra: "Możliwość załadunku na wywrotki i kontenery.",
  },
  {
    name: "Rozkładanie Materiału",
    description: "Rozkładanie Materiału na placu.",
    extra: "Precyzyjne rozplantowanie równiarką lub koparką.",
  },
  {
    name: "Sprzedaż hurtowa",
    description: "Zamówienia dla firm budowlanych.",
    extra: "Stałe rabaty i indywidualna wycena dla stałych klientów.",
  },
  {
    name: "Wynajem sprzętu",
    description: "Wynajem koparek i ładowarek.",
    extra: "Dostępny również wynajem z operatorem.",
  },
];


// Sortowalna karta
const SortableCard = ({ item }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.name });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      layout
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={`w-80 h-48 p-6 bg-white/60 rounded-2xl shadow-xl backdrop-blur cursor-grab active:cursor-grabbing select-none ${
        isDragging ? "opacity-0" : "opacity-100"
      }`}
      
    >
      <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
      <p className="text-sm text-gray-700">{item.description}</p>
    </motion.div>
  );
};

const Mid = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [direction, setDirection] = useState(0);
  const [initialEntrance, setInitialEntrance] = useState(true);
  const [serviceItems, setServiceItems] = useState(uslugi);
  const [activeService, setActiveService] = useState(null);

  const visibleRange = 2;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setInitialEntrance(false);
    }, 600);
    return () => clearTimeout(timeout);
  }, []);

  const getWrappedIndex = (index) => (index + items.length) % items.length;

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleDragStart = (event) => {
    const { active } = event;
    const found = serviceItems.find((item) => item.name === active.id);
    setActiveService(found);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = serviceItems.findIndex((i) => i.name === active.id);
      const newIndex = serviceItems.findIndex((i) => i.name === over?.id);
      setServiceItems((items) => arrayMove(items, oldIndex, newIndex));
    }
    setActiveService(null);
  };
  const krajobraz = "/loader_folder/krajobraZwirowania.jpg";
  return (
    <section className="min-h-screen flex flex-col items-center justify-start py-10 space-y-20">
      <div className="w-full flex justify-center"><img src={krajobraz} alt="zwirownia" className="w-full" /></div>
      <div className="flex justify-between px-[5%] ">
        <div className="w-[600%] flex flex-col justify-end text-2xl z-[10]"><h3 className="flex justify-center text-3xl">O nas</h3>

        <p className="text-center ">Cześć! Miło Cię widzieć na naszej stronie. <br />

Jesteśmy żwirownią z pasją i doświadczeniem – dosłownie i w przenośni. Naszą firmę tworzy zespół ludzi, którzy od ponad 15 lat działają w branży wydobycia kruszyw. Przez te lata nauczyliśmy się jednego: solidna praca, uczciwość i szacunek do klienta to fundamenty, na których warto budować – zarówno relacje, jak i drogi!

Działamy lokalnie, ale z profesjonalnym podejściem – wydobywamy i dostarczamy wysokiej jakości żwir, piasek oraz inne kruszywa, które trafiają zarówno na duże inwestycje budowlane, jak i do przydomowych ogródków. Każde zamówienie traktujemy indywidualnie, bez względu na jego wielkość. Niezależnie od tego, czy potrzebujesz kilku ton na budowę podjazdu, czy szukasz sprawdzonego dostawcy materiałów do większej inwestycji – jesteś w dobrych rękach.

Nasza żwirownia to nie tylko koparki, ładowarki i ciężarówki – to przede wszystkim ludzie. Znamy się na tym, co robimy, bo robimy to od lat. Chętnie doradzimy, podpowiemy najlepsze rozwiązanie i zadbamy, by wszystko dotarło na czas tam, gdzie powinno. Dla nas najważniejsze jest, byś po zakończonej współpracy chciał do nas wrócić – z uśmiechem i spokojem, że wszystko pójdzie sprawnie.

Dbamy również o środowisko i teren, na którym pracujemy – wydobycie prowadzimy zgodnie z obowiązującymi przepisami i z poszanowaniem natury. Zależy nam, by nasza praca miała nie tylko wartość dla klientów, ale i sens w dłuższej perspektywie.

Zapraszamy do współpracy – jesteśmy tu po to, by pomóc Ci zbudować solidne podstawy.</p>
        </div>
        <div className="w-[50%] flex gap-20 justify-center text-lg"><ConveyorBelt/></div>
      </div>
      <h2 className="text-3xl font-bold mb-6">Nasze Produkty</h2>

      {/* Karuzela */}
      <motion.div
  className="relative w-full h-[28rem] flex items-center justify-center overflow-hidden"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  <AnimatePresence initial={true} custom={direction}>
    {Array.from({ length: visibleRange * 2 + 1 }, (_, i) => {
      const offset = i - visibleRange;
      const index = getWrappedIndex(activeIndex + offset);
      const x = offset * 280; // zwiększony odstęp
      const scale = 1 - Math.abs(offset) * 0.15;
      const opacity = scale < 0.6 ? 0 : 1;

      return (
        <motion.div
  key={`${items[index].name}-${activeIndex}`}
  custom={direction}
  initial={
    initialEntrance
      ? { x: 0, scale: 1, opacity: 0 }
      : { x: direction * 200, scale: 0.5, opacity: 0 }
  }
  animate={{ x, scale, opacity }}
  exit={{ x: -direction * 200, scale: 0.5, opacity: 0 }}
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
  onClick={() => setSelectedItem(items[index])}
  style={{ zIndex: 10 - Math.abs(offset) }}
  className="absolute w-72 h-96 text-center text-white bg-white/20 backdrop-blur rounded-2xl shadow-2xl flex flex-col items-center justify-center font-semibold cursor-pointer p-4"
>
  <h3 className="text-2xl mb-2">{items[index].name}</h3>
  <p className="text-base text-white/80">{items[index].description}</p>
</motion.div>

      );
    })}
  </AnimatePresence>
</motion.div>


      {/* Nawigacja */}
      <div className="mt-6 flex space-x-4">
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 30, delay: 0.7 }}
          onClick={handlePrev}
          className="px-4 py-2 rounded-full backdrop-blur-0 bg-white/20 shadow"
        >
          <FiArrowLeft />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.85 }}
         
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 30, delay: 0.7 }}
          onClick={handleNext}
          className="px-4 py-2 rounded-full backdrop-blur-0 bg-white/20 shadow"
        >
          <FiArrowRight />
        </motion.button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              className="fixed w-full h-full inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setSelectedItem(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 100, damping: 25 }}
            >
              <div className="w-96 max-w-full bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center gap-8 text-black relative">
                <h3 className="text-xl font-bold mb-2">{selectedItem.name}</h3>
                <img src={selectedItem.source} alt={selectedItem.name} />
                <p>{selectedItem.description}</p>
                
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedItem(null)}
                  className="absolute right-2 top-2 text-white bg-cyan-500 rounded-full p-2 shadow-lg"
                >
                  <FiX />
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Usługi */}
      <div className="mt-20 w-full px-4">
        <h2 className="text-4xl font-bold mb-6 p-4 text-center ">Nasze Usługi</h2>
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={serviceItems.map((item) => item.name)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-wrap  justify-center gap-6 w-full max-w-5xl  mx-auto">
              {serviceItems.map((item) => (
                <SortableCard  key={item.name} item={item} />
                
              ))}
            </div>
          </SortableContext>

          <DragOverlay>
            {activeService && (
              <motion.div
                layout
                initial={{ scale: 0.9, opacity: 0.6 }}
                animate={{ scale: 1.4, opacity: 1 }}
                exit={{ scale: 1.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-60 h-36 p-4 bg-cyan-200 rounded-xl shadow-2xl flex flex-col justify-center items-start text-black font-semibold"
              >
                <h3 className="text-lg font-bold">{activeService.name}</h3>

                <div className="flex flex-row "><DiCode /><p className="text-xs">{activeService.description}</p></div>
                <div className="flex flex-row"><DiCode /><p className="text-xs">{activeService.extra}</p></div>
              </motion.div>
            )}
          </DragOverlay>
        </DndContext>
      </div>
      <div className="w-full h-full flex flex-col justify-center items-center"><div><h2 className="text-4xl font-bold mb-6 p-4 text-center ">Mapa</h2></div><div className="w-[80%] h-[450px]"> <iframe className="w-full h-full" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11099.534289528005!2d17.92178179126477!3d54.208590360193654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spl!2spl!4v1753107434754!5m2!1spl!2spl"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div></div>
    </section>
  );
};

export default Mid;
