import {
  GraduationCap,
  UserRoundCheck,
  UserRoundPen,
  UserSquare,
} from "lucide-react";
import { EducationForm } from "./components/EducationForm";
import { PersonalDetailsForm } from "./components/PersonalDetailsForm";
import { AvatarUpload } from "./components/AvatarUpload";
import { AlumniForm } from "./components/AlumniForm";

export const welcomeExperienceSections = [
  {
    name: "avatar",
    header: {
      title: "Give your profile a face",
      description:
        "Help the college community to get to know you better by uploading your picture. Use 200x200 pixels for best results.",
      icon: UserSquare,
    },
    main: AvatarUpload,
    btnText: "Continue",
  },
  {
    name: "personal_profile",
    header: {
      title: "Build your profile",
      description:
        "These details will be used for account safety and verification and will not be shared with anyone.",
      icon: UserRoundPen,
    },
    main: PersonalDetailsForm,
    btnText: "Continue",
  },
  {
    name: "education",
    header: {
      title: "Your education",
      description:
        "Provide your education details at NIT Arunachal Pradesh to help us verify you.",
      icon: GraduationCap,
    },
    main: EducationForm,
    btnText: "Continue",
  },
  {
    name: "membership_application",
    header: {
      title: "Alumni membership",
      description:
        "You will become a member of the college alumni community once your details are verified.",
      icon: UserRoundCheck,
    },
    main: AlumniForm,
    btnText: "Submit",
  },
];
