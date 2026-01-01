import React, { useState, useEffect } from "react";
import { Plus, Trash2, Save, MapPin, Globe } from "lucide-react";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import PageLayout from "../components/layout/PageLayout";
import { useOrg } from "../contexts/OrgContext";
import { useAuth } from "../contexts/AuthContext";

const CoverageAreaView = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { getOrganizationById, updateCoverage } = useOrg();
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    if (user?.id) {
      const loadCoverage = async () => {
        const orgData = await getOrganizationById(user.id);
        if (orgData && orgData.coverage_areas) {
          setAreas(orgData.coverage_areas || []);
        }
      };
      loadCoverage();
    }
  }, [user, getOrganizationById]);

  const addArea = () => {
    setAreas([...areas, { state: "", county: "", city: "", zip_code: "" }]);
  };

  const removeArea = (index) => {
    setAreas(areas.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const newAreas = [...areas];
    newAreas[index][field] = value;
    setAreas(newAreas);
  };

  const handleSave = async () => {
    if (!user?.id) return;
    setLoading(true);
    await updateCoverage(user.id, { coverage_areas: areas });
    setLoading(false);
  };

  return (
    <PageLayout className="max-w-5xl">
      {/* Header Section */}
      <PageHeader
        title="Coverage Areas"
        action={
          <Button
            variant="secondary"
            onClick={addArea}
            className="flex items-center gap-2"
          >
            <Plus size={18} className="text-amber-500" />
            Add New Area
          </Button>
        }
      />

      {/* Main Table Card */}
      <Card padding="p-0" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  State
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  County
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  City
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Zip Code
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {areas.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center text-slate-400">
                      <MapPin size={48} className="mb-3 opacity-20" />
                      <p className="text-lg font-medium">
                        No coverage areas defined
                      </p>
                      <p className="text-sm">
                        Click "Add New Area" to start defining your service
                        zone.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                areas.map((area, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-50/30 transition-colors group"
                  >
                    <td className="px-4 py-3">
                      <Input
                        placeholder="e.g. CA"
                        value={area.state}
                        onChange={(e) =>
                          handleChange(index, "state", e.target.value)
                        }
                        className="min-w-[80px]"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Input
                        placeholder="e.g. Orange"
                        value={area.county}
                        onChange={(e) =>
                          handleChange(index, "county", e.target.value)
                        }
                        className="min-w-[120px]"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Input
                        placeholder="e.g. Irvine"
                        value={area.city}
                        onChange={(e) =>
                          handleChange(index, "city", e.target.value)
                        }
                        className="min-w-[120px]"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Input
                        placeholder="e.g. 92602"
                        value={area.zip_code}
                        onChange={(e) =>
                          handleChange(index, "zip_code", e.target.value)
                        }
                        className="min-w-[100px]"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => removeArea(index)}
                        className="text-slate-300 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-all"
                        title="Remove Area"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer/Save Action */}
        {areas.length > 0 && (
          <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
            <p className="text-xs text-slate-500 font-medium">
              Showing {areas.length} active service{" "}
              {areas.length === 1 ? "area" : "areas"}.
            </p>
            <Button onClick={handleSave} disabled={loading} className="px-8">
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              ) : (
                <Save size={18} />
              )}
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}
      </Card>
    </PageLayout>
  );
};

export default CoverageAreaView;
