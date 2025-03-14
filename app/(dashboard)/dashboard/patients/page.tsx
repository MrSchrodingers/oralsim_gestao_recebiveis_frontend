"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { RefreshCw, Bell, Mail, MessageSquare, Phone, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { usePatientsData } from "@/hooks/usePatientsData";
import type { IPatientData } from "@/interfaces/IPatientData";

type NotificationMethod = "sms" | "email" | "whatsapp";

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [notificationMethod, setNotificationMethod] = useState<NotificationMethod | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPatientData, setSelectedPatientData] = useState<IPatientData | null>(null);

  const {
    patientsData,
    patientsDataLoading,
    patientsDataRefresh,
    patientsDataTotal,
  } = usePatientsData();

  const filteredPatientsData = patientsData.filter((pData) => {
    const { patient, phones } = pData;
    const phoneNumbers = phones.map((p) => p.phone_number).join(" ");
    const nameMatch = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const cpfMatch = patient.cpf?.includes(searchTerm);
    const phoneMatch = phoneNumbers.includes(searchTerm);
    return nameMatch || cpfMatch || phoneMatch;
  });

  function handleRefresh() {
    patientsDataRefresh();
  }

  function openNotificationDialog(pData: IPatientData) {
    setSelectedPatientData(pData);
    setIsDialogOpen(true);
  }

  function sendNotification() {
    if (!selectedPatientData || !notificationMethod) return;
    console.log("Enviando", notificationMethod, "para", selectedPatientData.patient.name);
    setIsDialogOpen(false);
    setNotificationMethod(null);
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-emerald-800 dark:text-emerald-400">Pacientes</h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar paciente..."
              className="pl-8 border-emerald-100 dark:border-emerald-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            onClick={handleRefresh}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            disabled={patientsDataLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${patientsDataLoading ? "animate-spin" : ""}`} />
            Atualizar
          </Button>
        </div>
      </div>

      <Card className="border-emerald-100 dark:border-emerald-900 shadow-sm">
        <CardHeader className="bg-emerald-50 dark:bg-emerald-900/20 rounded-t-lg pb-4">
          <CardTitle className="text-emerald-700 dark:text-emerald-400 text-lg">
            Lista de Pacientes ({patientsDataTotal})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50 dark:bg-gray-800">
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead>Telefone(s)</TableHead>
                  <TableHead>Última atualização</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatientsData.length > 0 ? (
                  filteredPatientsData.map((pData) => {
                    const { patient, phones } = pData;
                    const phoneDisplay = phones.map((p) => p.phone_number).join(", ");

                    return (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">{patient.name}</TableCell>
                        <TableCell>{patient.cpf || "-"}</TableCell>
                        <TableCell>{phoneDisplay || "-"}</TableCell>
                        <TableCell>
                          {patient.updated_at
                            ? format(new Date(patient.updated_at), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                            : "-"}
                        </TableCell>
                        <TableCell className="text-right">
                          <Dialog
                            open={
                              isDialogOpen && selectedPatientData?.patient.id === patient.id
                            }
                            onOpenChange={setIsDialogOpen}
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openNotificationDialog(pData)}
                              >
                                <Bell className="h-4 w-4 mr-1" />
                                Notificar
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle className="text-emerald-700 dark:text-emerald-400">
                                  Enviar Notificação
                                </DialogTitle>
                                <DialogDescription>
                                  Escolha como deseja notificar {patient.name}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid grid-cols-3 gap-4 py-4">
                                <Button
                                  variant="outline"
                                  onClick={() => setNotificationMethod("sms")}
                                >
                                  <Phone className="h-4 w-4 mr-2" />
                                  SMS
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => setNotificationMethod("email")}
                                >
                                  <Mail className="h-4 w-4 mr-2" />
                                  Email
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => setNotificationMethod("whatsapp")}
                                >
                                  <MessageSquare className="h-4 w-4 mr-2" />
                                  WhatsApp
                                </Button>
                              </div>
                              <DialogFooter>
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setIsDialogOpen(false);
                                    setNotificationMethod(null);
                                  }}
                                >
                                  Cancelar
                                </Button>
                                <Button
                                  onClick={sendNotification}
                                  disabled={!notificationMethod}
                                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                >
                                  Enviar
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      Nenhum paciente encontrado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
