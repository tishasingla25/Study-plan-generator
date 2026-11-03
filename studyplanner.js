import React, { useState, useEffect, useRef } from 'react';
import {
  LayoutDashboard,
  Sparkles,
  MessageSquare,
  BookOpen,
  Timer,
  GraduationCap,
  BarChart3,
  Settings,
  Moon,
  Sun,
  Plus,
  CheckCircle2,
  Clock,
  Calendar,
  Award,
  Play,
  Pause,
  RotateCcw,
  Trash2,
  Bot,
  User,
  Send,
  Zap,
  ChevronRight,
  TrendingUp,
  Download,
  Bell,
  RefreshCw,
  Search,
  Filter,
  Check,
  AlertCircle
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import confetti from 'canvas-confetti';

// --- INITIAL STATE & MOCK DATA ---
const INITIAL_STUDY_DATA = {
  profile: {
    name: 'Alex Sharma',
    level: 'Undergraduate',
    course: 'Computer Science & Engineering',
    dailyGoalHours: 4,
    streak: 5,
    totalHoursStudied: 42.5,
  },
  subjects: [
    {
      id: 'sub-1',
      name: 'Data Structures & Algorithms',
      color: '#3B82F6',
      difficulty: 'Hard',
      progress: 65,
      chapters: [
        { id: 'ch-1', title: 'Arrays & Strings', completed: true },
        { id: 'ch-2', title: 'Linked Lists & Stacks', completed: true },
        { id: 'ch-3', title: 'Trees & Graphs', completed: false },
        { id: 'ch-4', title: 'Dynamic Programming', completed: false }
      ]
    },
    {
      id: 'sub-2',
      name: 'Database Management Systems',
      color: '#8B5CF6',
      difficulty: 'Medium',
      progress: 80,
      chapters: [
        { id: 'ch-5', title: 'ER Diagrams & Relational Algebra', completed: true },
        { id: 'ch-6', title: 'SQL & Normalization', completed: true },
        { id: 'ch-7', title: 'Transactions & Indexing', completed: false }
      ]
    },
    {
      id: 'sub-3',
      name: 'Operating Systems',
      color: '#EC4899',
      difficulty: 'Hard',
      progress: 40,
      chapters: [
        { id: 'ch-8', title: 'Process & Threads', completed: true },
        { id: 'ch-9', title: 'Memory Management', completed: false },
        { id: 'ch-10', title: 'File Systems & Storage', completed: false }
      ]
    }
  ],
  tasks: [
    { id: 't-1', title: 'Revise Graph Algorithms (BFS/DFS)', subjectId: 'sub-1', priority: 'High', date: '2026-11-03', completed: false, durationMin: 60 },
    { id: 't-2', title: 'Solve 10 SQL Join Queries', subjectId: 'sub-2', priority: 'Medium', date: '2026-11-03', completed: true, durationMin: 45 },
    { id: 't-3', title: 'Read Virtual Memory Chapter', subjectId: 'sub-3', priority: 'High', date: '2026-11-04', completed: false, durationMin: 90 }
  ],
  exams: [
    { id: 'e-1', title: 'DBMS Mid-Term Exam', subjectId: 'sub-2', date: '2026-11-12', weightage: '30%' },
    { id: 'e-2', title: 'DSA Final Theory', subjectId: 'sub-1', date: '2026-11-20', weightage: '50%' }
  ],
  analytics: [
    { day: 'Mon', hours: 3.5 },
    { day: 'Tue', hours: 4.2 },
    { day: 'Wed', hours: 2.8 },
    { day: 'Thu', hours: 5.0 },
    { day: 'Fri', hours: 4.0 },
    { day: 'Sat', hours: 6.1 },
    { day: 'Sun', hours: 3.0 }
  ]
};

export default function App() {
  // Persistence
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('studySmart_data');
    return saved ? JSON.parse(saved) : INITIAL_STUDY_DATA;
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('studySmart_theme') === 'dark';
  });
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('studySmart_apikey') || '');

  useEffect(() => {
    localStorage.setItem('studySmart_data', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem('studySmart_theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const saveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem('studySmart_apikey', key);
  };

  return (
    <div className={`min-h-screen flex transition-colors duration-200 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      {/* Sidebar */}
      <aside className={`w-64 border-r flex flex-col justify-between p-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div>
          <div className="flex items-center gap-3 px-2 py-3 mb-6">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">StudySmart AI</h1>
              <p className="text-xs text-slate-400">Intelligent Academic Planner</p>
            </div>
          </div>

          <nav className="space-y-1">
            <NavButton icon={<LayoutDashboard />} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
            <NavButton icon={<Sparkles />} label="AI Plan Generator" active={activeTab === 'generator'} onClick={() => setActiveTab('generator')} badge="AI" />
            <NavButton icon={<MessageSquare />} label="AI Assistant" active={activeTab === 'assistant'} onClick={() => setActiveTab('assistant')} />
            <NavButton icon={<BookOpen />} label="Syllabus & Tasks" active={activeTab === 'syllabus'} onClick={() => setActiveTab('syllabus')} />
            <NavButton icon={<Timer />} label="Focus Timer" active={activeTab === 'timer'} onClick={() => setActiveTab('timer')} />
            <NavButton icon={<GraduationCap />} label="Exam Mode" active={activeTab === 'exams'} onClick={() => setActiveTab('exams')} />
            <NavButton icon={<BarChart3 />} label="Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
          </nav>
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <NavButton icon={<Settings />} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              darkMode ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span className="flex items-center gap-3">
              {darkMode ? <Moon className="w-4 h-4 text-purple-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
              {darkMode ? 'Dark Mode' : 'Light Mode'}
            </span>
            <div className={`w-8 h-4 rounded-full transition-colors relative ${darkMode ? 'bg-purple-600' : 'bg-slate-300'}`}>
              <div className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform ${darkMode ? 'left-4.5' : 'left-0.5'}`} />
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        {activeTab === 'dashboard' && <DashboardView data={data} setData={setData} setActiveTab={setActiveTab} />}
        {activeTab === 'generator' && <GeneratorView data={data} setData={setData} apiKey={apiKey} />}
        {activeTab === 'assistant' && <AssistantView apiKey={apiKey} subjects={data.subjects} />}
        {activeTab === 'syllabus' && <SyllabusView data={data} setData={setData} />}
        {activeTab === 'timer' && <TimerView data={data} setData={setData} />}
        {activeTab === 'exams' && <ExamView data={data} setData={setData} />}
        {activeTab === 'analytics' && <AnalyticsView data={data} />}
        {activeTab === 'settings' && <SettingsView data={data} setData={setData} apiKey={apiKey} saveApiKey={saveApiKey} />}
      </main>
    </div>
  );
}

function NavButton({ icon, label, active, onClick, badge }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
        active
          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
      }`}
    >
      <div className="flex items-center gap-3">
        {React.cloneElement(icon, { className: 'w-4 h-4' })}
        <span>{label}</span>
      </div>
      {badge && (
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${active ? 'bg-white/20 text-white' : 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'}`}>
          {badge}
        </span>
      )}
    </button>
  );
}

// --- DASHBOARD VIEW ---
function DashboardView({ data, setData, setActiveTab }) {
  const toggleTask = (taskId) => {
    setData((prev) => {
      const updatedTasks = prev.tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t));
      const isCompletedNow = updatedTasks.find((t) => t.id === taskId)?.completed;
      if (isCompletedNow) confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
      return { ...prev, tasks: updatedTasks };
    });
  };

  const completedCount = data.tasks.filter((t) => t.completed).length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl flex items-center justify-between relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-amber-300" /> 🔥 {data.profile.streak} Day Study Streak Active!
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">Welcome back, {data.profile.name}! 👋</h2>
          <p className="text-blue-100 max-w-xl text-sm">
            "Small daily improvements over time lead to stunning results." You have {data.tasks.filter((t) => !t.completed).length} pending tasks for today.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('generator')}
          className="relative z-10 px-5 py-3 rounded-2xl bg-white text-blue-600 font-bold text-sm shadow-lg hover:bg-blue-50 transition-all flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-blue-600" /> Generate AI Plan
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard icon={<Clock className="text-blue-500" />} label="Total Studied" value={`${data.profile.totalHoursStudied} hrs`} subText="Target: 4 hrs/day" />
        <StatCard icon={<CheckCircle2 className="text-emerald-500" />} label="Tasks Done" value={`${completedCount}/${data.tasks.length}`} subText={`${Math.round((completedCount / (data.tasks.length || 1)) * 100)}% completed`} />
        <StatCard icon={<Calendar className="text-amber-500" />} label="Next Exam In" value="9 Days" subText={data.exams[0]?.title || 'No upcoming exam'} />
        <StatCard icon={<Award className="text-purple-500" />} label="Study Streak" value={`${data.profile.streak} Days`} subText="Personal Best: 12 days" />
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Tasks */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Today's Schedule & Tasks</h3>
            <button onClick={() => setActiveTab('syllabus')} className="text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1">
              View All Tasks <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {data.tasks.map((task) => {
              const sub = data.subjects.find((s) => s.id === task.subjectId);
              return (
                <div
                  key={task.id}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                    task.completed ? 'bg-slate-50/50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-70' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${
                        task.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 dark:border-slate-700 hover:border-blue-500'
                      }`}
                    >
                      {task.completed && <Check className="w-4 h-4" />}
                    </button>
                    <div>
                      <p className={`font-semibold text-sm ${task.completed ? 'line-through text-slate-400' : ''}`}>{task.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: `${sub?.color}20`, color: sub?.color }}>
                          {sub?.name || 'General'}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {task.durationMin} mins
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${task.priority === 'High' ? 'bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                    {task.priority}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Sidebar Widget */}
        <div className="space-y-6">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-500" /> Subject Mastery
            </h3>
            <div className="space-y-3">
              {data.subjects.map((sub) => (
                <div key={sub.id} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>{sub.name}</span>
                    <span className="text-slate-400">{sub.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${sub.progress}%`, backgroundColor: sub.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, subText }) {
  return (
    <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
      <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800">{icon}</div>
      <div>
        <p className="text-xs font-medium text-slate-400">{label}</p>
        <p className="text-xl font-bold tracking-tight mt-0.5">{value}</p>
        <p className="text-[11px] text-slate-400 mt-0.5">{subText}</p>
      </div>
    </div>
  );
}

// --- AI STUDY PLAN GENERATOR VIEW ---
function GeneratorView({ data, setData, apiKey }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    dailyHours: 4,
    preferredTime: 'Evening',
    upcomingExam: data.exams[0]?.title || 'Final Exams',
    daysLeft: 14,
  });
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    // Simulating or execution with AI fallback logic
    setTimeout(() => {
      const mockGenerated = [
        { time: '09:00 AM - 10:30 AM', subject: 'Data Structures & Algorithms', activity: 'Concept Review & Dynamic Programming Problems', priority: 'High' },
        { time: '10:30 AM - 10:45 AM', subject: 'Break', activity: 'Short Walk & Hydrate', priority: 'Low' },
        { time: '10:45 AM - 12:00 PM', subject: 'Database Management', activity: 'SQL Joins & Indexing Hands-on Practice', priority: 'Medium' },
        { time: '04:00 PM - 05:30 PM', subject: 'Operating Systems', activity: 'Virtual Memory & Page Replacement Revision', priority: 'High' },
      ];
      setGeneratedPlan(mockGenerated);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">AI Dynamic Study Plan Generator</h2>
        <p className="text-slate-400 text-sm">Provide your timeline and preferences to let AI structure your day for peak performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase">Daily Study Budget (Hours)</label>
          <input
            type="number"
            value={form.dailyHours}
            onChange={(e) => setForm({ ...form, dailyHours: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase">Preferred Time Slot</label>
          <select
            value={form.preferredTime}
            onChange={(e) => setForm({ ...form, preferredTime: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="Morning">Morning (8 AM - 12 PM)</option>
            <option value="Afternoon">Afternoon (12 PM - 4 PM)</option>
            <option value="Evening">Evening (4 PM - 9 PM)</option>
            <option value="Night">Night Owl (9 PM - 2 AM)</option>
          </select>
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="md:col-span-2 py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-md hover:opacity-90 flex items-center justify-center gap-2"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {loading ? 'Crafting Personalized Schedule...' : 'Generate AI Study Schedule'}
        </button>
      </div>

      {generatedPlan && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <CheckCircle2 className="text-emerald-500" /> Recommended Optimized Schedule
          </h3>
          <div className="space-y-3">
            {generatedPlan.map((slot, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{slot.time}</span>
                  <p className="font-semibold text-sm mt-0.5">{slot.subject}</p>
                  <p className="text-xs text-slate-400">{slot.activity}</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-300">{slot.priority}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// --- AI ASSISTANT CHAT VIEW ---
function AssistantView({ apiKey, subjects }) {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am your AI Study Assistant. Ask me to explain a complex topic, generate revision notes, or quiz you on your subjects!' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Here is a quick summary for "${input}": Break down the topic into core principles, practice key problem scenarios, and review past exam questions for better recall.`
        }
      ]);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
        <Bot className="w-6 h-6 text-blue-600" />
        <div>
          <h3 className="font-bold text-sm">AI Tutor Assistant</h3>
          <p className="text-xs text-slate-400">Powered by Gemini AI</p>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.sender === 'ai' && <div className="p-2 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300 self-start"><Bot className="w-4 h-4" /></div>}
            <div className={`p-3.5 rounded-2xl text-sm max-w-md ${m.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex gap-2">
        <input
          type="text"
          placeholder="Ask anything about your syllabus..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:outline-none focus:border-blue-500"
        />
        <button onClick={sendMessage} className="p-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// --- SYLLABUS & TASKS VIEW ---
function SyllabusView({ data, setData }) {
  const [newSubject, setNewSubject] = useState('');

  const addSubject = () => {
    if (!newSubject.trim()) return;
    const sub = {
      id: `sub-${Date.now()}`,
      name: newSubject,
      color: '#10B981',
      difficulty: 'Medium',
      progress: 0,
      chapters: []
    };
    setData((prev) => ({ ...prev, subjects: [...prev.subjects, sub] }));
    setNewSubject('');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Subjects & Syllabus Manager</h2>
          <p className="text-slate-400 text-sm">Track syllabus completion chapter by chapter.</p>
        </div>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add new subject..."
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm"
        />
        <button onClick={addSubject} className="px-4 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center gap-1">
          <Plus className="w-4 h-4" /> Add Subject
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.subjects.map((sub) => (
          <div key={sub.id} className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base" style={{ color: sub.color }}>{sub.name}</h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">{sub.difficulty}</span>
            </div>
            <div className="space-y-2">
              {sub.chapters.map((ch) => (
                <div key={ch.id} className="flex items-center justify-between text-sm p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40">
                  <span className={ch.completed ? 'line-through text-slate-400' : ''}>{ch.title}</span>
                  <input type="checkbox" checked={ch.completed} readOnly className="rounded text-blue-600" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- FOCUS TIMER VIEW ---
function TimerView({ data, setData }) {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => setSecondsLeft((prev) => prev - 1), 1000);
    } else if (secondsLeft === 0) {
      setIsRunning(false);
      confetti();
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  return (
    <div className="max-w-md mx-auto text-center space-y-8 pt-12">
      <div>
        <h2 className="text-3xl font-extrabold">Pomodoro Focus Timer</h2>
        <p className="text-slate-400 text-sm mt-1">Stay focused and track your study sessions.</p>
      </div>

      <div className="w-64 h-64 mx-auto rounded-full border-8 border-blue-600/20 flex flex-col items-center justify-center bg-white dark:bg-slate-900 shadow-xl">
        <span className="text-5xl font-mono font-bold tracking-tight">
          {String(minutes).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        </span>
        <span className="text-xs text-slate-400 mt-2">Deep Focus Session</span>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="p-4 rounded-2xl bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all"
        >
          {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        <button
          onClick={() => { setIsRunning(false); setSecondsLeft(25 * 60); }}
          className="p-4 rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

// --- EXAM MODE VIEW ---
function ExamView({ data }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Exam Preparation Mode</h2>
        <p className="text-slate-400 text-sm">Countdowns and strategic revision plans for target exams.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.exams.map((exam) => (
          <div key={exam.id} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-lg">{exam.title}</h3>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400">
                {exam.weightage} Weight
              </span>
            </div>
            <p className="text-sm text-slate-400">Scheduled: {exam.date}</p>
            <div className="pt-2 flex justify-between items-center text-xs font-semibold">
              <span>Days Remaining</span>
              <span className="text-blue-600 text-base">9 Days</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- ANALYTICS VIEW ---
function AnalyticsView({ data }) {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Progress Analytics</h2>
        <p className="text-slate-400 text-sm">Visualize your weekly study performance.</p>
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-bold text-sm">Weekly Hours Studied</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.analytics}>
              <XAxis dataKey="day" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip />
              <Bar dataKey="hours" fill="#3B82F6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// --- SETTINGS VIEW ---
function SettingsView({ data, setData, apiKey, saveApiKey }) {
  const [tempKey, setTempKey] = useState(apiKey);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-slate-400 text-sm">Manage profile details and Gemini API integration.</p>
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-bold text-sm">Google Gemini API Key</h3>
        <p className="text-xs text-slate-400">Enter your key to unlock real-time AI study planning and responses.</p>
        <div className="flex gap-2">
          <input
            type="password"
            placeholder="AIzaSy..."
            value={tempKey}
            onChange={(e) => setTempKey(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm"
          />
          <button onClick={() => saveApiKey(tempKey)} className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm">
            Save Key
          </button>
        </div>
      </div>
    </div>
  );
}