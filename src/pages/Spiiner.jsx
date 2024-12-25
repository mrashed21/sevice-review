import { motion } from "framer-motion";

const Spinner = () => {
  const dots = [...Array(8)];

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="relative flex items-center justify-center w-16 h-16">
        {dots.map((_, index) => {
          const angle = (360 / dots.length) * index;
          return (
            <motion.span
              key={index}
              initial={{ opacity: 0.3 }}
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
                delay: index * 0.1,
              }}
              style={{
                position: "absolute",
                width: "8px",
                height: "25px",
                backgroundColor: "#3B82F6",
                borderRadius: "4px",
                transform: `rotate(${angle}deg) translate(0, -28px)`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Spinner;
