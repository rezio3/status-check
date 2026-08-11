import Text from "../../../components/Text";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Header from "../../../components/Header";

const ICON_COLOR = "text-primary";

const Perks = () => {
  const items = [
    {
      icon: <VerifiedUserIcon className={ICON_COLOR} fontSize="large" />,
      header: "Bezpieczne dane",
      description: "Twoje dane są u nas bezpieczne i chronione.",
    },
    {
      icon: <WatchLaterIcon className={ICON_COLOR} fontSize="large" />,
      header: "Aktualizacje na bieżąco",
      description: "Status naprawy aktualizowany w czasie rzeczywistym.",
    },
    {
      icon: <NotificationsIcon className={ICON_COLOR} fontSize="large" />,
      header: "Powiadomienia",
      description: "Otrzymasz powiadomienie, gdy auto będzie gotowe.",
    },
  ];
  return (
    <div
      className="bg-dark40 w-100 d-flex justify-content-between p-4 rounded-4"
      style={{ marginBottom: 100 }}
    >
      {items.map((perk) => (
        <div
          className="d-flex align-items-center gap-3"
          style={{ maxWidth: 280 }}
        >
          {perk.icon}
          <div className="d-flex flex-column gap-1">
            <Header style={{ fontWeight: 600, fontSize: 16 }} as="h3">
              {perk.header}
            </Header>
            <Text style={{ fontSize: 14 }}>{perk.description}</Text>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Perks;
