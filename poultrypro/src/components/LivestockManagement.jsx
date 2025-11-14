import React, { useState } from 'react';
import { Plus, Activity, AlertCircle, Calendar, TrendingUp, Syringe, Edit2, Trash2, Clock, Egg } from 'lucide-react';

export default function LivestockManagement() {
  const [flocks, setFlocks] = useState([
   
  ]);

  const [showAddFlockForm, setShowAddFlockForm] = useState(false);
  const [showDailyRecordForm, setShowDailyRecordForm] = useState(false);
  const [showVaccineForm, setShowVaccineForm] = useState(false);
  const [selectedFlockId, setSelectedFlockId] = useState(null);
  
  const [newFlock, setNewFlock] = useState({
    name: '', quantity: '', breed: '', startDate: '', avgWeight: '', status: 'healthy'
  });

  const [dailyRecord, setDailyRecord] = useState({
    date: new Date().toISOString().split('T')[0],
    time: '18:00',
    mortality: 0,
    eggCollection: 0,
    sickCount: 0
  });

  const [vaccination, setVaccination] = useState({
    date: '',
    vaccine: 'Newcastle Disease',
    doseType: 'Dose 1',
    certId: '',
    veterinarian: '',
    nextDue: ''
  });

  // Recommended vaccines with schedules
  const recommendedVaccines = [
    { name: 'Marek\'s Disease', timing: 'Day 1 (at hatchery)', frequency: 'Once' },
    { name: 'Newcastle Disease', timing: 'Day 7-14', frequency: 'Every 6-8 weeks' },
    { name: 'Infectious Bronchitis', timing: 'Day 14-21', frequency: 'Every 10-12 weeks' },
    { name: 'Gumboro (IBD)', timing: 'Day 14-21', frequency: 'Booster at 4 weeks' },
    { name: 'Fowl Pox', timing: 'Week 8-12', frequency: 'Annually' },
    { name: 'Infectious Coryza', timing: 'Week 10-12', frequency: 'Every 12 weeks' },
    { name: 'Egg Drop Syndrome', timing: 'Week 14-16', frequency: 'Before lay' },
    { name: 'Avian Influenza', timing: 'As recommended', frequency: 'Seasonally' }
  ];

  const addFlock = () => {
    if (newFlock.name && newFlock.quantity && newFlock.breed && newFlock.startDate) {
      const age = Math.floor((new Date() - new Date(newFlock.startDate)) / (1000 * 60 * 60 * 24 * 7));
      setFlocks([...flocks, { 
        ...newFlock, 
        id: Date.now(), 
        quantity: parseInt(newFlock.quantity), 
        age: age,
        dailyRecords: [],
        vaccinations: []
      }]);
      setNewFlock({ name: '', quantity: '', breed: '', startDate: '', avgWeight: '', status: 'healthy' });
      setShowAddFlockForm(false);
    }
  };

  const addDailyRecord = () => {
    if (selectedFlockId && dailyRecord.date && dailyRecord.time) {
      setFlocks(flocks.map(flock => {
        if (flock.id === selectedFlockId) {
          const updatedRecords = [dailyRecord, ...flock.dailyRecords];
          const totalMortality = updatedRecords.reduce((sum, r) => sum + parseInt(r.mortality || 0), 0);
          const updatedQuantity = flock.quantity - totalMortality;
          const reportedSick = parseInt(dailyRecord.sickCount || 0);
          const newStatus = reportedSick > 0 ? 'attention' : flock.status;

          return {
            ...flock,
            quantity: updatedQuantity,
            status: newStatus,
            dailyRecords: updatedRecords
          };
        }
        return flock;
      }));
      setDailyRecord({ date: new Date().toISOString().split('T')[0], time: '18:00', mortality: 0, eggCollection: 0, sickCount: 0 });
      setShowDailyRecordForm(false);
    }
  };

  const addVaccination = () => {
    if (selectedFlockId && vaccination.date && vaccination.vaccine) {
      setFlocks(flocks.map(flock => {
        if (flock.id === selectedFlockId) {
          return {
            ...flock,
            vaccinations: [vaccination, ...flock.vaccinations]
          };
        }
        return flock;
      }));
      setVaccination({ date: '', vaccine: 'Newcastle Disease', nextDue: '' });
      setShowVaccineForm(false);
    }
  };

  const deleteFlock = (id) => {
    setFlocks(flocks.filter(flock => flock.id !== id));
  };

  const totalBirds = flocks.reduce((sum, flock) => sum + flock.quantity, 0);
  const totalMortality = flocks.reduce((sum, flock) => 
    sum + flock.dailyRecords.reduce((s, r) => s + parseInt(r.mortality || 0), 0), 0
  );
  const totalEggs = flocks.reduce((sum, flock) => 
    flock.dailyRecords.length > 0 ? sum + parseInt(flock.dailyRecords[0].eggCollection || 0) : sum, 0
  );
  const attentionNeeded = flocks.filter(f => f.status === 'attention').length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-red-700 mb-2">Livestock Management</h1>
          <p className="text-yellow-600">Monitor flock health, growth rates and vaccination schedules</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Birds</p>
                <p className="text-3xl font-bold text-red-700">{totalBirds}</p>
              </div>
              <Activity className="text-red-400" size={32} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Today's Eggs</p>
                <p className="text-3xl font-bold text-yellow-600">{totalEggs}</p>
              </div>
              <Egg className="text-yellow-500" size={32} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Mortality</p>
                <p className="text-3xl font-bold text-red-600">{totalMortality}</p>
              </div>
              <AlertCircle className="text-red-500" size={32} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Needs Attention</p>
                <p className="text-3xl font-bold text-yellow-700">{attentionNeeded}</p>
              </div>
              <AlertCircle className="text-yellow-500" size={32} />
            </div>
          </div>
        </div>

        {/* Vaccination Schedule Reference */}
        <div className="bg-yellow-50 border-2 border-red-400 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
            <Syringe className="text-red-600" />
            Recommended Vaccination Schedule
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedVaccines.map((vaccine, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border-l-4 border-yellow-500">
                <p className="font-semibold text-red-700 text-sm mb-1">{vaccine.name}</p>
                <p className="text-xs text-gray-600">Timing: {vaccine.timing}</p>
                <p className="text-xs text-red-600">{vaccine.frequency}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setShowAddFlockForm(!showAddFlockForm)}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition flex items-center gap-2 shadow-md"
          >
            <Plus size={20} />
            Add New Flock
          </button>
        </div>

        {/* Add Flock Form */}
        {showAddFlockForm && (
          <div className="bg-yellow-50 p-6 rounded-lg shadow mb-6 border-l-4 border-red-500">
            <h3 className="text-xl font-bold mb-4 text-red-700">Add New Flock</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Flock name"
                value={newFlock.name}
                onChange={(e) => setNewFlock({...newFlock, name: e.target.value})}
                className="border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="number"
                placeholder="Initial quantity"
                value={newFlock.quantity}
                onChange={(e) => setNewFlock({...newFlock, quantity: e.target.value})}
                className="border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="text"
                placeholder="Breed"
                value={newFlock.breed}
                onChange={(e) => setNewFlock({...newFlock, breed: e.target.value})}
                className="border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="date"
                placeholder="Start Date"
                value={newFlock.startDate}
                onChange={(e) => setNewFlock({...newFlock, startDate: e.target.value})}
                className="border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="number"
                step="0.1"
                placeholder="Avg Weight (kg)"
                value={newFlock.avgWeight}
                onChange={(e) => setNewFlock({...newFlock, avgWeight: e.target.value})}
                className="border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={addFlock}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
              >
                Add Flock
              </button>
              <button
                onClick={() => setShowAddFlockForm(false)}
                className="bg-yellow-300 text-yellow-900 px-6 py-2 rounded-lg hover:bg-yellow-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Daily Record Form */}
        {showDailyRecordForm && (
          <div className="bg-yellow-50 p-6 rounded-lg shadow mb-6 border-l-4 border-red-500">
            <h3 className="text-xl font-bold mb-4 text-red-700">Add Daily Record</h3>
            <p className="text-sm text-gray-600 mb-4">
              <Clock size={16} className="inline mr-2" />
              Recommended time: 6:00 PM (End of day for accurate counts)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="date"
                value={dailyRecord.date}
                onChange={(e) => setDailyRecord({...dailyRecord, date: e.target.value})}
                className="border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="time"
                value={dailyRecord.time}
                onChange={(e) => setDailyRecord({...dailyRecord, time: e.target.value})}
                className="border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="number"
                placeholder="Mortality count"
                value={dailyRecord.mortality}
                onChange={(e) => setDailyRecord({...dailyRecord, mortality: e.target.value})}
                className="border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="number"
                placeholder="Eggs collected"
                value={dailyRecord.eggCollection}
                onChange={(e) => setDailyRecord({...dailyRecord, eggCollection: e.target.value})}
                className="border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={addDailyRecord}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
              >
                Save Record
              </button>
              <button
                onClick={() => setShowDailyRecordForm(false)}
                className="bg-yellow-300 text-yellow-900 px-6 py-2 rounded-lg hover:bg-yellow-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Vaccination Form */}
        {showVaccineForm && (
          <div className="bg-yellow-50 p-6 rounded-lg shadow mb-6 border-l-4 border-red-500">
            <h3 className="text-xl font-bold mb-4 text-red-700">Add Vaccination Record</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="date"
                value={vaccination.date}
                onChange={(e) => setVaccination({...vaccination, date: e.target.value})}
                className="border border-gray-300 rounded-lg px-4 py-2"
              />
              <select
                value={vaccination.vaccine}
                onChange={(e) => setVaccination({...vaccination, vaccine: e.target.value})}
                className="border border-gray-300 rounded-lg px-4 py-2"
              >
                {recommendedVaccines.map((vaccine, index) => (
                  <option key={index} value={vaccine.name}>{vaccine.name}</option>
                ))}
              </select>
              <input
                type="date"
                placeholder="Next due date"
                value={vaccination.nextDue}
                onChange={(e) => setVaccination({...vaccination, nextDue: e.target.value})}
                className="border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={addVaccination}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
              >
                Add Vaccination
              </button>
              <button
                onClick={() => setShowVaccineForm(false)}
                className="bg-yellow-300 text-yellow-900 px-6 py-2 rounded-lg hover:bg-yellow-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Flocks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {flocks.map((flock) => (
            <div key={flock.id} className={`bg-yellow-50 rounded-lg shadow p-6 ${flock.status === 'attention' ? 'border-2 border-red-500' : 'border-2 border-yellow-300'}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-red-700">{flock.name}</h3>
                  <p className="text-sm text-red-600">{flock.breed} • {flock.age} weeks old</p>
                </div>
                <button
                  onClick={() => deleteFlock(flock.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-yellow-100 p-3 rounded border-l-4 border-red-500">
                  <span className="text-red-700 text-sm font-semibold">Current Population</span>
                  <p className="text-2xl font-bold text-red-700">{flock.quantity}</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded border-l-4 border-yellow-600">
                  <span className="text-red-700 text-sm font-semibold">Avg Weight</span>
                  <p className="text-2xl font-bold text-red-700">{flock.avgWeight} kg</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => {
                    setSelectedFlockId(flock.id);
                    setShowDailyRecordForm(true);
                  }}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm flex items-center justify-center gap-2 shadow-md"
                >
                  <Plus size={16} />
                  Daily Record
                </button>
                <button
                  onClick={() => {
                    setSelectedFlockId(flock.id);
                    setShowVaccineForm(true);
                  }}
                  className="flex-1 bg-yellow-500 text-yellow-900 px-4 py-2 rounded-lg hover:bg-yellow-600 text-sm flex items-center justify-center gap-2 font-semibold shadow-md"
                >
                  <Syringe size={16} />
                  Vaccination
                </button>
              </div>

              {/* Daily Records */}
              {flock.dailyRecords.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-red-700 mb-2 text-sm">Recent Records</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {flock.dailyRecords.slice(0, 5).map((record, index) => (
                      <div key={index} className="bg-red-50 p-2 rounded text-xs border-l-2 border-red-400">
                        <div className="flex justify-between">
                          <span className="text-red-700 font-semibold">{record.date} {record.time}</span>
                          <div className="flex gap-3">
                            <span className="text-red-600 font-bold">dead {record.mortality}</span>
                            <span className="text-yellow-600 font-bold">eggs {record.eggCollection}</span>

                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Vaccinations */}
              {flock.vaccinations.length > 0 && (
                <div>
                  <h4 className="font-semibold text-red-700 mb-2 text-sm flex items-center gap-2">
                    <Syringe size={16} />
                    Vaccination History
                  </h4>
                  <div className="space-y-2">
                    {flock.vaccinations.slice(0, 3).map((vacc, index) => (
                      <div key={index} className="bg-yellow-100 p-2 rounded text-xs border-l-2 border-yellow-500">
                        <p className="font-semibold text-red-700">{vacc.vaccine}</p>
                        <div className="flex justify-between text-red-600">
                          <span>Given: {vacc.date}</span>
                          {vacc.nextDue && <span className="text-red-700 font-bold">Next: {vacc.nextDue}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}