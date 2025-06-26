const ProfileBannerDoodle = ({ className = '' }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 800 200"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      {/* Wavy line */}
      <path
        d="M0 100 C 100 50, 200 150, 300 100 S 500 50, 600 100 S 700 150, 800 100"
        stroke="currentColor"
      />

      {/* Random Doodles */}
      <circle cx="50" cy="50" r="10" />
      <circle cx="750" cy="150" r="10" />
      <rect x="380" y="60" width="20" height="20" rx="4" />
      <path d="M600 30 Q610 20 620 30 T640 30" />
      <path d="M200 180 Q210 170 220 180 T240 180" />
      <line x1="700" y1="40" x2="720" y2="60" />
      <line x1="720" y1="40" x2="700" y2="60" />
    </svg>
  );
};

export default ProfileBannerDoodle;
