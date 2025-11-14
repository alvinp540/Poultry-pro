import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle, Clock, User, Calendar, Trash2, Edit2 } from 'lucide-react';

export default function TaskManagement() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Feed chickens - Morning', assignee: 'John Doe', priority: 'high', status: 'pending', dueDate: '2025-11-11', category: 'Feeding', description: '' },
    { id: 2, title: 'Clean coops', assignee: 'Jane Smith', priority: 'medium', status: 'in-progress', dueDate: '2025-11-11', category: 'Maintenance', description: '' },
    { id: 3, title: 'Collect eggs', assignee: 'John Doe', priority: 'high', status: 'completed', dueDate: '2025-11-11', category: 'Production', description: '' },
    { id: 4, title: 'Vaccination schedule', assignee: 'Dr. Brown', priority: 'high', status: 'pending', dueDate: '2025-11-12', category: 'Health', description: '' }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '', assignee: '', priority: 'medium', status: 'pending', dueDate: '', category: 'Feeding', description: ''
  });

  // Set up listener for vaccination tasks from Livestock Management
  useEffect(() => {
    window.addTaskFromVaccination = (taskData) => {
      const newVaccinationTask = {
        id: Date.now(),
        title: taskData.title,
        assignee: taskData.assignee,
        priority: taskData.priority,
        status: 'pending',
        dueDate: taskData.dueDate,
        category: taskData.category,
        description: taskData.description || ''
      };
      setTasks(prevTasks => [newVaccinationTask, ...prevTasks]);
      
  // Show simple alert (reset to normal prompt)
  alert(`✅ Task created: ${taskData.title}`);
    };

    return () => {
      delete window.addTaskFromVaccination;
    };
  }, []);

  const addTask = () => {
    if (newTask.title && newTask.assignee && newTask.dueDate) {
      setTasks([...tasks, { ...newTask, id: Date.now() }]);
      setNewTask({ title: '', assignee: '', priority: 'medium', status: 'pending', dueDate: '', category: 'Feeding' });
      setShowAddForm(false);
    }
  };

  const deleteTask = (id) => {
    const taskToDelete = tasks.find(t => t.id === id);
    const title = taskToDelete ? taskToDelete.title : 'this task';
    const confirmed = window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`);
    if (!confirmed) return;
    setTasks(tasks.filter(task => task.id !== id));
    alert(`Deleted: ${title}`);
  };

  const toggleStatus = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const statuses = ['pending', 'in-progress', 'completed'];
        const currentIndex = statuses.indexOf(task.status);
        const nextStatus = statuses[(currentIndex + 1) % statuses.length];
        return { ...task, status: nextStatus };
      }
      return task;
    }));
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-yellow-100 text-yellow-700';
      case 'in-progress': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    pending: tasks.filter(t => t.status === 'pending').length
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-red-700 mb-2">Task & Work Management</h1>
          <p className="text-red-600 font-semibold">Organize daily farm operations and track worker assignments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Tasks</p>
                <p className="text-3xl font-bold text-red-700">{taskStats.total}</p>
              </div>
              <Clock className="text-red-400" size={32} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Completed</p>
                <p className="text-3xl font-bold text-yellow-600">{taskStats.completed}</p>
              </div>
              <CheckCircle className="text-yellow-400" size={32} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">In Progress</p>
                <p className="text-3xl font-bold text-red-600">{taskStats.inProgress}</p>
              </div>
              <Clock className="text-red-400" size={32} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-3xl font-bold text-yellow-700">{taskStats.pending}</p>
              </div>
              <Calendar className="text-yellow-400" size={32} />
            </div>
          </div>
        </div>

        {/* Add Task Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition flex items-center gap-2 shadow-md"
          >
            <Plus size={20} />
            Add New Task
          </button>
        </div>

        {/* Add Task Form */}
        {showAddForm && (
          <div className="bg-yellow-50 p-6 rounded-lg shadow mb-6 border-l-4 border-red-500">
            <h3 className="text-xl font-bold mb-4 text-red-700">Create New Task</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Task title"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                className="border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="text"
                placeholder="Assignee name"
                value={newTask.assignee}
                onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
                className="border border-gray-300 rounded-lg px-4 py-2"
              />
              <select
                value={newTask.category}
                onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                className="border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="Feeding">Feeding</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Production">Production</option>
                <option value="Health">Health</option>
              </select>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                className="border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                className="border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={addTask}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
              >
                Add Task
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Tasks List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Task</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assignee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{task.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{task.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        {task.assignee}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleStatus(task.id)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}
                      >
                        {task.status}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{task.dueDate}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}