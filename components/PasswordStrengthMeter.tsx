import React from "react";

type PasswordCriteriaProps = {
  password: string;
};

const PasswordCriteria: React.FC<PasswordCriteriaProps> = ({ password }) => {
  const criteria = [
    { label: "At least 8 characters", test: (pass: string) => pass.length >= 8 },
    { label: "At least one number", test: (pass: string) => /\d/.test(pass) },
    { label: "At least one uppercase letter", test: (pass: string) => /[A-Z]/.test(pass) },
    { label: "At least one lowercase letter", test: (pass: string) => /[a-z]/.test(pass) },
    { label: "At least one special character", test: (pass: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pass) },
  ];

  return (
    <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1">
      {criteria.map(({ label, test }) => (
        <li key={label} className={test(password) ? "text-green-500" : "text-red-500"}>
          {label}
        </li>
      ))}
    </ul>
  );
};

type PasswordStrengthMeterProps = {
  password: string;
};

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  const getStrength = (pass: string): number => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/\d/.test(pass)) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pass)) score++;
    return score;
  };

  const getColor = (strength: number): string => {
    if (strength <= 2) return "bg-red-500";
    if (strength === 3 || strength === 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = (strength: number): string => {
    if (strength <= 2) return "Weak";
    if (strength === 3 || strength === 4) return "Moderate";
    return "Strong";
  };

  const strength = getStrength(password);

  return (
    <div className="mt-2">
      <div className="w-full h-2 bg-gray-200 rounded">
        <div className={`h-full ${getColor(strength)} rounded transition-all duration-300`} style={{ width: `${(strength / 5) * 100}%` }} />
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{getStrengthText(strength)}</p>
      <PasswordCriteria password={password} />
    </div>
  );
};

export default PasswordStrengthMeter;
