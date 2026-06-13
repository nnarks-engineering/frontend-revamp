import { useState } from "react";

import { createFileRoute } from "@tanstack/react-router";
import { PlusCircle } from "lucide-react";

import { CreateServiceModal } from "@/components/app/services/CreateServiceModal";
import { Button } from "@/components/ui/button";
import { useCurrentCompany } from "@/shared/hooks/company/use-current-company";
import { useMyServices } from "@/shared/hooks/service/use-services";


export const Route = createFileRoute("/_app/organization/")({
  component: OrganizationPage,
});

function OrganizationPage() {
  const { activeCompany } = useCurrentCompany();

  const { data: services = [], isLoading } = useMyServices(activeCompany?.id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-350 mx-auto pb-12 px-6">
      <div className="flex items-center justify-between py-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Organization Services</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage the services your organization provides to clients.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <PlusCircle className="w-4 h-4" />
          Create Service
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-2xl border border-border/40">
          <h3 className="text-lg font-bold text-foreground">No services found</h3>
          <p className="text-muted-foreground mt-2 mb-6 max-w-md mx-auto text-sm">
            You haven't added any services yet. Create your first service to let clients know what you offer.
          </p>
          <Button onClick={() => setIsModalOpen(true)} className="gap-2">
            <PlusCircle className="w-4 h-4" />
            Create Service
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white p-6 rounded-2xl border border-border/40 shadow-sm">
              <h3 className="font-bold text-[16px] text-foreground mb-2 truncate">
                {service.title}
              </h3>
              <p className="text-[13px] text-muted-foreground line-clamp-3 mb-4 min-h-[60px]">
                {service.description || "No description provided."}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md uppercase tracking-wide">
                  {service.category || "Uncategorized"}
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  Status: <span className="capitalize text-foreground font-semibold">{service.status}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeCompany && (
        <CreateServiceModal
          companyId={activeCompany.id}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      )}
    </div>
  );
}
