'use client';

import { motion } from 'framer-motion';

const antigravityIcons = [
  { name: 'folder', svg: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z"/></svg>' },
  { name: 'merge', svg: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor"><path d="M480-80q-17 0-28.5-11.5T440-120v-163q-52-12-86-53.5T320-440q0-54 31-98.5t89-63.5v-198q-36 10-58 39.5T360-692q0 17-11.5 28.5T320-652q-17 0-28.5-11.5T280-692q0-75 52.5-121.5T480-860q80 0 132.5 46.5T665-692q0 17-11.5 28.5T625-652q-17 0-28.5-11.5T585-692q0-38-22-67.5T505-799v198q58 19 89 63.5t31 98.5q0 61-34 102.5T505-283v163q0 17-11.5 28.5T480-80Zm0-280q33 0 56.5-23.5T560-440q0-33-23.5-56.5T480-520q-33 0-56.5 23.5T400-440q0 33 23.5 56.5T480-360Z"/></svg>' },
  { name: 'terminal', svg: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm80-120h400v-40H240v40Zm120-100q12 0 21-9t9-21q0-12-9-21l-80-80 80-80q9-9 9-21t-9-21q-9-9-21-9t-21 9l-101 101q-4 4-6 9.5t-2 11.5q0 6 2 11.5t6 9.5l101 101q9 9 21 9Z"/></svg>' },
  { name: 'deployed_code', svg: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor"><path d="M480-80 120-280v-400l360-200 360 200v400L480-80ZM160-318l320 178 320-178v-324L480-820 160-642v324Zm320-162-320-178 320-178 320 178-320 178Zm0 178-320-178 320-178 320 178-320 178ZM160-642l320 178 320-178-320-178-320 178Z"/></svg>' },
  { name: 'pen_spark', svg: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor"><path d="M480-120v-80h280v-40q0-54-31-98.5t-89-63.5l-120 120H440v-80l40-40q42 0 74.5 16.5T600-400q0 17 11.5 28.5T640-360q17 0 28.5-11.5T680-400q0-75-52.5-121.5T480-568L200-288l80 80h120l40 40H320l-120-120v-163l440-440q15-15 35.5-15t35.5 15l160 160q15 15 15 35.5t-15 35.5L720-120H480Z"/></svg>' },
  { name: 'check_circle', svg: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm140-354-46-46-154 154-78-78-46 46 124 124 200-200Z"/></svg>' },
  { name: 'data_object', svg: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor"><path d="M320-120q-33 0-56.5-23.5T240-200v-160q0-33-23.5-56.5T160-440q17 0 28.5-11.5T200-480q0-17-11.5-28.5T160-520q33 0 56.5-23.5T240-600v-160q0-33 23.5-56.5T320-840h80v80h-80v160q0 33-23.5 56.5T240-520q17 0 28.5 11.5T280-480q0 17-11.5 28.5T240-440q33 0 56.5 23.5T320-360v160h80v80h-80Zm320 0h-80v-80h80v-160q0-33 23.5-56.5T720-440q-17 0-28.5-11.5T680-480q0 17 11.5 28.5T720-520q-33 0-56.5-23.5T640-600v-160h-80v-80h80q33 0 56.5 23.5T720-760v160q0 33 23.5 56.5T800-520q-17 0-28.5 11.5T760-480q0 17 11.5 28.5T800-440q-33 0-56.5-23.5T720-360v160q0 33-23.5 56.5T640-120Z"/></svg>' },
  { name: 'developer_mode_tv', svg: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm200-100 46-46-94-94 94-94-46-46-140 140 140 140Zm240 0 140-140-140-140-46 46 94 94-94 94 46 46Zm-240-380v480-480Z"/></svg>' },
  { name: 'code_blocks', svg: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor"><path d="M320-120q-33 0-56.5-23.5T240-200v-560q0-33 23.5-56.5T320-840h480q33 0 56.5 23.5T880-760v560q0 33-23.5 56.5T800-120H320Zm0-80h480v-560H320v560Zm80-120h320v-80H400v80Zm0-120h320v-80H400v80Zm0-120h320v-80H400v80ZM160-280q-17 0-28.5-11.5T120-320v-480q0-33 23.5-56.5T160-880h320q17 0 28.5-11.5T520-840v80H200v560h80q17 0 28.5-11.5T280-160q0 17-11.5 28.5T240-120H160Z"/></svg>' },
  { name: 'dashboard_customize', svg: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor"><path d="M560-120v-280h280v280H560Zm-440-440v-280h280v280H120Zm440-440h280v280H560v-280ZM120-120v-280h280v280H120Zm80-80h120v-120H200v120Zm440 0h120v-120H640v120Zm0-440h120v-120H640v120ZM200-640h120v-120H200v120Zm0 0v-120 120Z"/></svg>' },
  { name: 'meta', svg: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="currentColor"><path d="M14.285 4.318C12.529 4.318 11.234 5.253 10.435 6.463c-.156.236-.312.493-.435.753-.122-.26-.279-.517-.435-.753-.799-1.21-2.094-2.145-3.85-2.145-3.35 0-5.715 3.322-5.715 7.682 0 4.359 2.365 7.682 5.715 7.682 1.756 0 3.051-.935 3.85-2.145.156-.236.312-.493.435-.753.123.26.279.517.435.753.799 1.21 2.094 2.145 3.85 2.145 3.35 0 5.715-3.322 5.715-7.682 0-4.359-2.365-7.682-5.715-7.682zm-8.57 12.593c-1.742 0-3.14-2.106-3.14-4.911s1.398-4.911 3.14-4.911c1.547 0 2.585 1.554 2.585 3.714 0 2.387-.714 4.097-2.585 6.108zm8.57 0c-1.871-2.01-2.585-3.72-2.585-6.108 0-2.16 1.038-3.714 2.585-3.714 1.742 0 3.14 2.106 3.14 4.911s-1.398 4.911-3.14 4.911z"/></svg>' },
  { name: 'instagram', svg: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-4.78 2.618-4.78 4.78 0 1.28.014 1.688.072 4.947.2 4.358 2.618 4.78 4.78 4.78 1.28 0 1.688-.014 4.947-.072 4.358-.2 4.78-2.618 4.78-4.78 0-1.28-.014-1.688-.072-4.947-.2-4.358-2.618-4.78-4.78-4.78-1.28 0-1.688.014-4.947.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>' },
];

export default function SymbolWaveSection() {
  const displayIcons = [...antigravityIcons, ...antigravityIcons, ...antigravityIcons, ...antigravityIcons];

  return (
    <section className="relative py-32 md:py-40 overflow-x-clip bg-[#F8F9FC]">
      {/* 1:1 REPLICA OF THE SYMBOL WAVE */}
      <div className="relative mb-24 h-48 flex items-center">
        <motion.div 
          className="flex gap-[24px] items-center whitespace-nowrap px-4"
          animate={{ x: [0, -1000] }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {displayIcons.map((icon, idx) => (
            <motion.div
              key={idx}
              className="flex-shrink-0"
              style={{
                y: 0,
              }}
              animate={{
                y: [0, -32, 0, 32, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: idx * 0.4
              }}
            >
              <div className="w-[64px] h-[64px] rounded-full bg-[#EFF2F7] flex items-center justify-center text-[#121317]">
                <div 
                  className="w-[24px] h-[24px]"
                  dangerouslySetInnerHTML={{ __html: icon.svg }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 1:1 REPLICA OF THE TEXT SECTION */}
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-2">
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[48px] md:text-[88px] font-[450] tracking-[-0.03em] leading-[1.05] text-[#121317]"
          >
            We grow brands
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[48px] md:text-[88px] font-[450] tracking-[-0.03em] leading-[1.05] text-[#121317]"
          >
            We don&apos;t do average
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[48px] md:text-[88px] font-[450] tracking-[-0.03em] leading-[1.05] text-[#121317]"
          >
            We do results
          </motion.p>
        </div>
      </div>
    </section>
  );
}
