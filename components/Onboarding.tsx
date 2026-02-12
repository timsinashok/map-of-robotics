import React from 'react';
import { X, MousePointer2, GitBranch, Search } from 'lucide-react';

interface OnboardingProps {
    onClose: () => void;
    isDarkMode: boolean;
}

const Onboarding: React.FC<OnboardingProps> = ({ onClose, isDarkMode }) => {
    
    const panelClass = isDarkMode 
      ? "bg-gray-900 border-gray-700 text-white" 
      : "bg-white border-slate-200 text-slate-800";
    
    const subTextClass = isDarkMode ? "text-gray-400" : "text-slate-500";
    const itemBgClass = isDarkMode ? "bg-gray-800/50" : "bg-slate-50";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className={`border rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200 ${panelClass}`}>
                <div className={`p-6 border-b flex justify-between items-center ${isDarkMode ? "border-gray-800" : "border-slate-100"}`}>
                    <h2 className="text-2xl font-bold">Welcome to RoboMap</h2>
                    <button onClick={onClose} className={`hover:opacity-70 transition-opacity ${subTextClass}`}>
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6 space-y-6">
                    <p className={`${isDarkMode ? "text-gray-300" : "text-slate-600"} leading-relaxed`}>
                        This is an interactive <strong>Family Tree</strong> of robotics research. It organizes ideas logically from foundational tools to modern applications.
                    </p>
                    
                    <div className="grid grid-cols-1 gap-4">
                        <div className={`flex items-start gap-4 p-3 rounded-lg ${itemBgClass}`}>
                            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                                <MousePointer2 size={24} />
                            </div>
                            <div>
                                <h3 className="font-medium">Pan & Zoom</h3>
                                <p className={`text-sm ${subTextClass}`}>Drag to move the tree. Scroll to zoom in on specific clusters.</p>
                            </div>
                        </div>
                        
                        <div className={`flex items-start gap-4 p-3 rounded-lg ${itemBgClass}`}>
                            <div className="p-2 bg-green-500/10 text-green-500 rounded-lg">
                                <GitBranch size={24} />
                            </div>
                            <div>
                                <h3 className="font-medium">Hierarchical View</h3>
                                <p className={`text-sm ${subTextClass}`}>
                                    <strong>Left:</strong> Core Foundations (Root)<br/>
                                    <strong>Right:</strong> Specific Research Topics
                                </p>
                            </div>
                        </div>

                        <div className={`flex items-start gap-4 p-3 rounded-lg ${itemBgClass}`}>
                            <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg">
                                <Search size={24} />
                            </div>
                            <div>
                                <h3 className="font-medium">Deep Dive</h3>
                                <p className={`text-sm ${subTextClass}`}>Click any node to reveal definitions and key papers.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-6 pt-0">
                    <button 
                        onClick={onClose}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-blue-500/20"
                    >
                        Start Exploring
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;