import { useState } from "react";
import { useAddCar, useUserCars } from "../../hooks/useCars";
import Header from "../../components/Header";
import SideBar from "./sideBar/SideBar";

type UserViewPropsType = {
  authData: any;
  isAuthLoading: boolean;
};

export const UserView = ({ authData, isAuthLoading }: UserViewPropsType) => {
  const [plateNumber, setPlateNumber] = useState("");

  const isAuthenticated = authData?.authenticated;
  const userEmail = authData?.user?.email;

  const { data: cars = [], isLoading: isCarsLoading } =
    useUserCars(isAuthenticated);

  const addCarMutation = useAddCar(() => setPlateNumber(""));
  console.log(isCarsLoading);
  console.log(userEmail);
  const handleAddCar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!plateNumber.trim()) return;
    addCarMutation.mutate(plateNumber);
  };
  console.log(handleAddCar);
  if (isAuthLoading) {
    // DO POPRAWY
    return <Header as="h2">Czeaj</Header>;
  }
  console.log(cars);

  return (
    <div className="w-100 d-flex" style={{ flex: 1 }}>
      <SideBar userName={userEmail} />
      dsf sdfsd
    </div>
  );
};

// const a = () => {
//   return (
//     <Box sx={{ width: "100%", maxWidth: 600 }}>
//       <Paper
//         elevation={2}
//         sx={{ p: 3, mb: 4, textAlign: "center", bgcolor: "#f9f9f9" }}
//       >
//         <Typography variant="h6" color="textSecondary" gutterBottom>
//           Zalogowany jako:
//         </Typography>
//         <Typography variant="h4" color="primary">
//           {userEmail}
//         </Typography>
//       </Paper>
//       <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
//         <Typography variant="h6" sx={{ mb: 2 }}>
//           Dodaj nowe auto do bazy
//         </Typography>
//         <Box
//           component="form"
//           onSubmit={handleAddCar}
//           sx={{ display: "flex", gap: 2, alignItems: "stretch" }}
//         >
//           <TextField
//             fullWidth
//             label="Numer rejestracyjny"
//             value={plateNumber}
//             onChange={(e) => setPlateNumber(e.target.value)}
//             placeholder="np. DW 12345"
//             disabled={addCarMutation.isPending}
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             disabled={addCarMutation.isPending || !plateNumber.trim()}
//             sx={{ whitespace: "nowrap", px: 3 }}
//           >
//             {addCarMutation.isPending ? (
//               <CircularProgress size={24} />
//             ) : (
//               "Dodaj auto"
//             )}
//           </Button>
//         </Box>
//         {addCarMutation.isError && (
//           <Typography color="error" variant="body2" sx={{ mt: 1 }}>
//             {addCarMutation.error.message}
//           </Typography>
//         )}
//       </Paper>
//       <Paper elevation={2} sx={{ p: 3 }}>
//         <Typography variant="h6" sx={{ mb: 2 }}>
//           Twoja lista pojazdów ({cars.length})
//         </Typography>
//         {isCarsLoading ? (
//           <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
//             <CircularProgress size={28} />
//           </Box>
//         ) : cars.length === 0 ? (
//           <Typography color="textSecondary" align="center" sx={{ py: 2 }}>
//             Brak przypisanych aut. Dodaj pierwsze auto powyżej!
//           </Typography>
//         ) : (
//           <List>
//             {cars.map((car) => (
//               <ListItem
//                 key={car.id}
//                 sx={{
//                   borderBottom: "1px solid #eee",
//                   "&:last-child": { borderBottom: "none" },
//                 }}
//               >
//                 <DirectionsCarIcon sx={{ mr: 2, color: "action.active" }} />
//                 <ListItemText
//                   primary={
//                     <Typography variant="subtitle1">
//                       {car.plateNumber}
//                     </Typography>
//                   }
//                   secondary={`VIN: ${car.vin} | Właściciel: ${car.ownerName}`}
//                 />
//               </ListItem>
//             ))}
//           </List>
//         )}
//       </Paper>
//     </Box>
//   );
// };
